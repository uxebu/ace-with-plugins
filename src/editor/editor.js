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
      var positions = renaming.getPositionOfOccurence(self.getContent(), 42);
      if (positions.length) {
        self._editor.setMultipleCursorsTo(positions);
      }
    });
  }
};

module.exports = Editor;
