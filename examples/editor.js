var Editor = require('../src/editor/editor');
var esprima = require('esprima');
var escope = require('escope');
var esrefactor = require('esrefactor');
var context;
var syntax;
var parserTime;

var editor = new Editor('editorNode');
//editor.setContent('function foo(){var num = 0;} num = 9;');

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

