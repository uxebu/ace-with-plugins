var renaming = require('../refactoring/renaming');
var arrayUtil = require('../util/array');
var highlight = require('../refactoring/highlight')

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

  placeCursorsForRenaming: function() {
    var cursorPosition = this._editor.getAbsoluteCursorPosition();
    var candidatePositions = renaming.getCursorPositions(this.getContent(), cursorPosition);
    this._setCursorsForRenaming(candidatePositions, cursorPosition);
  },

  _setCursorsForRenaming: function(candidatePositions, cursorPosition) {
    var hasAnythingToRename = candidatePositions.length > 0;
    if (hasAnythingToRename) {
      var candidatesWithCursorAtEnd = arrayUtil.moveValueToEnd(candidatePositions, cursorPosition);
      this._editor.setMultipleCursorsTo(candidatesWithCursorAtEnd);
    }
  },
  highlightOccurences: function () {
    var cursorPosition = this._editor.getAbsoluteCursorPosition();
    highlight.getRangeOfOccurrence(this.getContent(), cursorPosition);
  }
};

module.exports = Editor;
