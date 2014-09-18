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

  enableLiveRenaming: function() {
    renaming.getPositionOfOccurence(this.getContent(), 42)
  }
};

module.exports = Editor;
