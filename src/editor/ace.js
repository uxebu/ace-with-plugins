var cursorPosition = require('../util/cursor-position');
var Range = ace.require('ace/range').Range;

function Ace(domNodeId) {
  this._domNodeId = domNodeId;
  this._init();
}

Ace.prototype = {

  _init: function() {
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

  setContent: function(content) {
    this._editor.selectAll();
    this._editor.insert(content);
  },

  getContent: function() {
    return this._editor.getValue()
  },

  getAbsoluteCursorPosition: function() {
    return cursorPosition.toAbsolute(this._editor.selection.getCursor(), this.getContent());
  },

  setMultipleCursorsTo: function(positions) {
    this._setMarkers(positions);
  },

  _setMarkers: function(positions) {
    var sourceCode = this.getContent();
    var editor = this._editor;
    positions.forEach(function(position) {
      var rowCol = cursorPosition.toRowColumn(position, sourceCode);
      var range = new Range(rowCol.row, rowCol.column, rowCol.row, rowCol.column);
      editor.multiSelect.addRange(range);
    });
  }

//  insertAtCursorPosition: function(s) {
//    this._editor.insert(s);
//  }
};

module.exports = Ace;
