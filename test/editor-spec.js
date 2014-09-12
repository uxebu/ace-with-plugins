var Editor = require('../src/editor/editor');

describe('Setting up Editor', function () {
  var ace;
  var editor = new Editor('editorNode');
//  var editor = new Editor('editorNode');
  spyOn(editor, '_init');
  expect(editor._init).toHaveBeenCalled();
});