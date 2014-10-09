var RenameCandidates = require('../../refactoring/rename-candidates');
var SourceCodeWatcher = require('./source-code-watcher');
var Highlighter = require('./highlighter');

// TODOs
// - if `bar` is on the line below, and you just do cursor down, rename mode is NOT turned off, but cursors move ... awkward
// - if I change a variable `f` to `foo` which exists already renaming is turned off, since the nodeIndexes don't match anymore
//   maybe improve to also select the already existing vars, OR better ignore the 'other' variables ... whatever is right!?

function RenameMode(editor) {
  this._editor = editor;
}

RenameMode.prototype = {

  getContent: function() {
    return this._editor.getContent();
  },

  _canSourceCodeBeParsed: function() {
    try {
      new RenameCandidates(this.getContent(), 0);
      return true;
    } catch (e) {
      // The source code cant be parsed (syntax error most probably).
    }
    return false;
  },

  _candidates: null,
  _highlighter: null,
  turnOn: function() {
    var cursorPosition = this._editor.getAbsoluteCursorPosition();
    if (!this._canSourceCodeBeParsed()) {
      return;
    }
    this._candidates = new RenameCandidates(this.getContent(), cursorPosition);
    this._editor.turnOnMultipleCursorsAt(this._candidates.getAbsolutePositions());
    this._highlighter = new Highlighter(this._editor);
    this._highlighter.updateRanges(this._candidates.getRanges());
    this._watcher = new SourceCodeWatcher(this._editor, this._candidates.getCount());
    this._watcher.onContentOrCursorChange(this._onContentOrCursorChange.bind(this));
  },

  _onContentOrCursorChange: function() {
    var isSourceCodeIdentical = false;
    var candidates;
    if (this._canSourceCodeBeParsed()) {
      candidates = new RenameCandidates(this.getContent(), this._editor.getAbsoluteCursorPosition());
      if (candidates.isSourceCodeIdentical(this._candidates)) {
        isSourceCodeIdentical = true;
      }
    }

    if (isSourceCodeIdentical) {
      this._highlighter.updateRanges(candidates.getRanges());
    } else {
      this._turnOff();
    }
  },

  _turnOff: function() {
    this._highlighter.off();
    this._editor.turnOffMultipleCursors();
    this._watcher.stopWatching();
  }

};

module.exports = RenameMode;
