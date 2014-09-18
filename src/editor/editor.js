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
    var self = this;
    this._editor.onCursorMove(function() {
      renaming.getPositionOfOccurence(self.getContent(), 42);
      self._editor.setMultipleCursorsTo([0, 23, 42]);
    });
  }
};

module.exports = Editor;
