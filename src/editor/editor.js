var RenameMode = require('./untested/rename-mode');

function Editor(editor) {
  this._editor = editor;
}

Editor.prototype = {

  setContent: function(content) {
    this._editor.setContent(content);
  },

  getContent: function() {
    return this._editor.getContent();
  },

  turnOnRenameMode: function() {
    var renameMode = new RenameMode(this._editor);
    renameMode.turnOn();
  }
};

module.exports = Editor;
