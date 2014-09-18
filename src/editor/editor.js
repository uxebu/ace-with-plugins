var renaming = require('../refactoring/renaming');

function Editor(EditorClass, domNodeId) {
  this._editor = new EditorClass(domNodeId);
}

Editor.prototype = {

  setContent: function(content) {
    this._editor.setContent(content);
  },

  getContent: function() {
    return this._editor.getContent();
  },

  enableLiveRenaming: function() {
    this._editor.onCursorMove(this._handleNewCursorPosition.bind(this));
  },

  _handleNewCursorPosition: function(cursorPosition) {
    var variablePositions = renaming.getPositionOfOccurence(this.getContent(), cursorPosition);
console.log(variablePositions);
    if (variablePositions.length) {
//      this._editor.placeMultipleCursorsAt(variablePositions);
    }
  }
};

module.exports = Editor;
