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
    this._editor.onCursorMove(this._handleRenaming.bind(this));
  },

  _handleRenaming: function(cursorPosition) {
    var renameCandidatesFoundAt = renaming.getPositionOfOccurence(this.getContent(), cursorPosition);
    if (renameCandidatesFoundAt.length) {
      this._editor.setMultipleCursorsTo(renameCandidatesFoundAt);
    }
  }
};

module.exports = Editor;
