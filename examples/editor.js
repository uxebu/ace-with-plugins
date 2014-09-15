var Editor = require('../src/editor/editor');
var esprima = require('esprima');
var escope = require('escope');
var esrefactor = require('esrefactor');
var context;
var syntax;
var parserTime;

var editor = new Editor('editorNode');
//editor.setContent('function foo(){var num = 0;} num = 9;');
editor.setContent('var foo = 42; y = foo * 2; z = foo / 2');

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

  var identification = context.identify(4);
  var cursorPosition = editor._editor.selection.getCursor();
  console.log('Cursor Position', cursorPosition);

  var identifier = identification.identifier;
  var declaration = identification.declaration;
  var references = identification.references;

  console.log('Identifier', identifier);
  console.log('References', references);

  debugger;
}
