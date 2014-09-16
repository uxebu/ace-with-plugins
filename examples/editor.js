var Editor = require('../src/editor/editor');
var esprima = require('esprima');
var escope = require('escope');
var esrefactor = require('esrefactor');
var context;
var code;
var syntax;
var parserTime;

var editor = new Editor('editorNode');
editor.setContent('function foo(){ var test = 0;}\nvar test = 4\nvar foo = 42; y = foo * 2; z = foo / 2');

parse();

function parse() {
  if (!context) {
    context = new esrefactor.Context();
  }

  code = editor.getContent();

  var syntax = esprima.parse(code, {
    loc: true,
    range: true,
    tokens: true,
    tolerant: true
  });

  context.setCode(code);

  editor._editor.selection.on("changeCursor", function () {
    var cursorPosition = editor._editor.session.doc.positionToIndex(editor._editor.selection.getCursor());
    console.log('Cursor Position', cursorPosition);
    var identification = context.identify(cursorPosition);
    console.log('Identification', identification);

  });

//  var identifier = identification.identifier;
//  var declaration = identification.declaration;
//  var references = identification.references;


}
