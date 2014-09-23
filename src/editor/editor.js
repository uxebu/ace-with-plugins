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
    var candidatePositions = renaming.getCursorPositions(this.getContent(), cursorPosition);
    this._setCursorsForRenaming(candidatePositions, cursorPosition);
  },

  _setCursorsForRenaming: function(candidatePositions, cursorPosition) {
    var hasAnythingToRename = candidatePositions.length > 0;
    if (hasAnythingToRename) {
      var candidatesWithCursorAtEnd = _moveValueToEndOfArray(candidatePositions, cursorPosition);
      this._editor.setMultipleCursorsTo(candidatesWithCursorAtEnd);
    }
  }
};

function _removeValueFromArray(values, valueToBeRemoved) {
  var foundAt = values.indexOf(valueToBeRemoved);
  var sliceBeforeValue = values.slice(0, foundAt);
  var sliceAfterValue = values.slice(foundAt + 1);
  return sliceBeforeValue.concat(sliceAfterValue);
}

function _moveValueToEndOfArray(values, valueToBeMovedToEnd) {
  return _removeValueFromArray(values, valueToBeMovedToEnd)
    .concat(valueToBeMovedToEnd);
}

module.exports = Editor;
