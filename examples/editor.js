var Editor = require('../src/editor/editor');
var Ace = require('../src/editor/ace');

var ace = new Ace();
ace.setDomNodeId('editorNode');
var editor = new Editor(ace);
editor.setContent('function foo(){ var test = 0;}\nvar test = 4\nvar foo = 42; y = foo * 2; z = foo / 2');

document.getElementById('renameButton').addEventListener('click', function () {
  editor.removeHighlightedOccurences();
  editor.placeCursorsForRenaming();
  editor.highlightOccurences();
  editor._editor._editor.textInput.focus(); // hack in getting back the focus

  editor.getEditorSession().selection.on('changeSelection', function (e) {
    editor.removeHighlightedOccurences();
    editor.highlightOccurences();
  });
});

document.getElementById('removeHighlightingButton').addEventListener('click', function () {
  editor.removeHighlightedOccurences();
  editor._editor.textInput.focus(); // hack in getting back the focus
});

document.getElementById('deactivateRenaming').addEventListener('click', function () {
  renamingIsActive = false;
  clearInterval(onCursorChange);
});
