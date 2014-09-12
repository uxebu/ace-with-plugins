var Editor = require('../src/editor/editor');
var esprima = require('esprima');
var escope = require('escope');
var esrefactor = require('esrefactor');
var context;
var syntax;
var parserTime;


var editor = new Editor('editorNode');
editor.setContent('function foo(){var num = 0;} num = 9;');

var value = editor.getContent();
console.log('Value', value);


editor._editor.getSession().selection.on('changeCursor', function(e) {
  console.log(editor._editor.getCopyText()); //get current selected Text
  var range = editor._editor.selection.getWordRange(); //start / end position of selected word (row/column)
//  editor._editor.selection.selectWord();
//  editor._editor.session.highlight();

  console.log('Range', range);
});


//
//
//var keywords = "function";
////keywords = new RegExp(keywords);
//
//editor._editor.findAll(keywords,{
//  caseSensitive: false,
//  wholeWord: true,
//  regExp: false
//});





//parse();


function parse() {
  var code = editor.getContent();

  if (!context) {
    context = new esrefactor.Context();
  }

  syntax = esprima.parse(code, {
    loc: true,
    range: true,
    tolerant: true
  });
  context.setCode(syntax);

}

