var Editor = require('../src/editor/editor');
var esprima = require('esprima');
var escope = require('escope');
var esrefactor = require('esrefactor');
var context;
var syntax;
var parserTime;

var editor = new Editor('editorNode');
//editor.setContent('function foo(){var num = 0;} num = 9;');
editor.setContent('var x = 42; y = x * 2; z = x / 2');


//var editorSession = editor._editor.session;
//
//
//editor._editor.getSession().selection.on('changeCursor', function (e) {
//  var currentlySelectedText = editor._editor.getCopyText(); //get current selected Text
//  var range = editor._editor.selection.getWordRange(); //start / end position of selected word (row/column)
////  editor._editor.selection.selectWord();
////  editor._editor.session.highlight();
//
//});

//addMarker(Range range, String clazz, Function | String type, Boolean inFront)

//addDynamicMarker(Object marker, Boolean inFront)

//var marker = {}
//marker.cursors = [{row: 0, column: 10}]
//
//marker.update = function(html, markerLayer, session, config) {
//  var start = config.firstRow, end = config.lastRow;
//  var cursors = this.cursors
//  for (var i = 0; i < cursors.length; i++) {
//    var pos = this.cursors[i];
//    if (pos.row < start) {
//      continue
//    } else if (pos.row > end) {
//      break
//    } else {
//      // compute cursor position on screen
//      // this code is based on ace/layer/marker.js
//      var screenPos = session.documentToScreenPosition(pos)
//
//      var height = config.lineHeight;
//      var width = config.characterWidth;
//      var top = markerLayer.$getTop(screenPos.row, config);
//      var left = markerLayer.$padding + screenPos.column * width;
//      // can add any html here
//      html.push(
//          "<div class='MyCursorClass' style='",
//          "height:", height, "px;",
//          "top:", top, "px;",
//          "left:", left, "px; width:", width, "px'></div>"
//      );
//    }
//  }
//}
//
//marker.redraw = function() {
//  this.session._signal("changeFrontMarker");
//}
//
//marker.addCursor = function() {
//  // add to this cursors
////  ....
//  // trigger redraw
//  marker.redraw()
//}
//marker.session = editor._editor.session;
//marker.session.addDynamicMarker(marker, true)

// call marker.session.removeMarker(marker.id) to remove it
// call marker.redraw after changing one of cursors

//
//

//  var keywords = currentlySelectedText;
//keywords = new RegExp(keywords);



//  trigger();

//  function trigger() {
//    var keywords = "num";
////    var range = editor._editor.selection.getWordRange(); //start / end position of selected word (row/column)
//
//    var range = new Range(1, 1, 10, 1)
//
//    console.log('Range', range);
//
//    editor._editor.findAll(keywords, {
//      caseSensitive: false,
//      wholeWord: true,
//      regExp: false
//    });
//
//    editorSession.replace(range, 'newText');
//  }


parse();

function parse() {
  code = editor.getContent();

  if (!context) {
    context = new esrefactor.Context();
  }

  var syntax = esprima.parse(code, {
    loc: true,
    range: true,
    tokens: true,
    tolerant: true
  });

  context.setCode(syntax);

  var id = context.identify(4);
  console.log('Name', id.declaration.name);
  console.log('Range', id.declaration.range);
  debugger;


}

