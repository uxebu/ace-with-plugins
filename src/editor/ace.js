var cursorPosition = require('../util/cursor-position');

function Ace() {
}

Ace.prototype = {

  setDomNodeId: function (domNodeId) {
    this._domNodeId = domNodeId;
    this._init();
  },

  _init: function () {
    ace.require("ace/ext/language_tools");
    var editor = ace.edit(this._domNodeId);
    this._editor = editor;
    editor.getSession().setMode('ace/mode/javascript');
    editor.setOptions({
      enableBasicAutocompletion: true
    });

    editor.getSession().setTabSize(2);
    document.getElementById(this._domNodeId).style.fontSize = '12px';
    document.getElementById(this._domNodeId).style.backgroundColor = 'white';
  },

  setContent: function (content) {
    this._editor.selectAll();
    this._editor.insert(content);
  },

  getContent: function () {
    return this._editor.getValue()
  },

  getAbsoluteCursorPosition: function () {
    return cursorPosition.toAbsolute(this._editor.selection.getCursor(), this.getContent());
  },

  setMultipleCursorsTo: function (positions) {
    this._setMarkers(positions);
  },

  _setMarkers: function (positions) {
    var Range = ace.require('ace/range').Range;
    var sourceCode = this.getContent();
    var editor = this._editor;
    positions.forEach(function (position) {
      var rowCol = cursorPosition.toRowColumn(position, sourceCode);
      var range = new Range(rowCol.row, rowCol.column, rowCol.row, rowCol.column);
      editor.multiSelect.addRange(range);
    });
  },

  highlightOccurences: function (occurencesToHighlight) {
    var Range = ace.require('ace/range').Range;
    var editor = this._editor;

    occurencesToHighlight.forEach(function (position) {
      var range = new Range(position.startOfRange.row, position.startOfRange.column, position.endOfRange.row, position.endOfRange.column);
      editor.getSession().addMarker(range, "ace_selected_word", "text");
      editor.multiSelect.addRange(range);
    });
  }
};

module.exports = Ace;
