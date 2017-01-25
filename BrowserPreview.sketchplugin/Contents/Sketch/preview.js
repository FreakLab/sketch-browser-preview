// Preview design on browser (cmd shift .)

var get_html = function(name, background) {
  return "<html><head><meta charset='UTF-8'></head>" +
    "<body style='text-align: center;    margin: 0; padding: 0; background: " + background + ";'> <img src='./" + name + ".png' center top no-repeat;'></body></html>";
}

var get_background = function(artboard) {
  var backgroundColor = artboard.backgroundColor();

  var red = (backgroundColor.red() * 255).toFixed(0);
  var green = (backgroundColor.green() * 255).toFixed(0);
  var blue = (backgroundColor.blue() * 255).toFixed(0);
  var alpha = backgroundColor.alpha().toFixed(2);

  return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

var preview = function(doc) {
  const err_msg = "You must create almost an artboard.";

  var artboard = doc.currentPage().currentArtboard();

  if (artboard == null) doc.showMessage(err_msg);

  if (artboard != null) {
    var name = artboard.name();
    var artboard_filename = NSTemporaryDirectory() + name + ".png";
    doc.saveArtboardOrSlice_toFile(artboard, artboard_filename);

    var background = get_background(artboard);

    var someContent = NSString.stringWithString_(get_html(name, background));
    var filename = NSTemporaryDirectory() + name + ".html";
    someContent.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(filename, true);

    var file = NSURL.fileURLWithPath(filename);
    NSWorkspace.sharedWorkspace().openFile(file.path());
  }
}

var onRun = function(context) {
  preview(context.document);
}
