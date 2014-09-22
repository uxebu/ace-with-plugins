var renaming = require('../refactoring/renaming');

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

  renameAtCurrentPosition: function() {
    renaming.getPositionsOfCandidates(this.getContent(), this._editor.getAbsoluteCursorPosition());
  }
};

module.exports = Editor;
