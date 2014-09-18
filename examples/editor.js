var Editor = require('../src/editor/editor');
var Ace = require('../src/editor/ace');

var editor = new Editor(Ace, 'editorNode');
editor.setContent('function foo(){ var test = 0;}\nvar test = 4\nvar foo = 42; y = foo * 2; z = foo / 2');
editor.enableLiveRenaming();
