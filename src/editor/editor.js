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
    var cursorPosition = this._editor.getAbsoluteCursorPosition();
    var candidatePositions = renaming.getPositionsOfCandidates(this.getContent(), cursorPosition);
    this._setCursorsForRenaming(candidatePositions, cursorPosition);
  },

  _setCursorsForRenaming: function(candidatePositions, cursorPosition) {
    var anythingToRename = candidatePositions.length > 0;
    if (anythingToRename) {
      var candidatesWithCursorAtEnd = _moveValueToEndOfArray(candidatePositions, cursorPosition);
      this._editor.setMultipleCursorsTo(candidatesWithCursorAtEnd);
    }
  }
};

function _moveValueToEndOfArray(values, valueToBeMovedToEnd) {
  var foundAt = values.indexOf(valueToBeMovedToEnd);
  return values.slice(0, foundAt)
    .concat(values.slice(foundAt + 1))
    .concat(valueToBeMovedToEnd);
}

module.exports = Editor;
