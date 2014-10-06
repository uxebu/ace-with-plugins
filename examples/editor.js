var Editor = require('../src/editor/editor');
var Ace = require('../src/editor/ace');

var ace = new Ace();
ace.setDomNodeId('editorNode');
var editor = new Editor(ace);
editor.setContent('function func(){ var test = 0;}\nfunc();\nvar test = 4\nvar foo = 42,\n    bar;\ny = bar * 2;\nz = foo / 2;\nfoo = bar * 2;');

document.getElementById('renameButton').addEventListener('click', function() {
  editor.placeCursorsForRenaming();
  editor._editor._editor.textInput.focus(); // hack in getting back the focus
});
