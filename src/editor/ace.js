var cursorPosition = require('../util/cursor-position');

function Ace() {}

Ace.prototype = {

  setDomNodeId: function(domNodeId) {
    this._domNodeId = domNodeId;
    this._init();
  },

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
    this._setCursors(positions);
  },

  _setCursors: function(positions) {
    var Range = ace.require('ace/range').Range;
    var sourceCode = this.getContent();
    var editor = this._editor;
    positions.forEach(function(position) {
      var rowCol = cursorPosition.toRowColumn(position, sourceCode);
      var range = new Range(rowCol.row, rowCol.column, rowCol.row, rowCol.column);
      editor.multiSelect.addRange(range);
    });
//var cmd = {
//  name: "ourSpecialCommand",
//  bindKey: "esc",
//  exec: function(editor) { console.log('WHATEVER command'); editor.exitMultiSelectMode(); }
//};
//var m = ace.require('ace/commands/multi_select_commands');
//m.keyboardHandler.addCommand(cmd);
  },

  onSourceCodeChange: function(cb) {
    this._editor.on('change', cb);
  },
  offSourceCodeChange: function(cb) {
    this._editor.off('change', cb);
  },
  onCursorPositionsChange: function(cb) {
    this._editor.selection.lead.on('change', cb);
  },
  offCursorPositionsChange: function(cb) {
    this._editor.selection.lead.off('change', cb);
  },

  _highlightMarkers: null,
  setHighlights: function(ranges) {
    var Range = ace.require('ace/range').Range;
    var sourceCode = this.getContent();
    var editor = this._editor;
    var markers = [];
    ranges.forEach(function(range) {
      var startRowCol = cursorPosition.toRowColumn(range[0], sourceCode);
      var endRowCol = cursorPosition.toRowColumn(range[1], sourceCode);
      var highlightRange = new Range(startRowCol.row, startRowCol.column, endRowCol.row, endRowCol.column);
      markers.push(editor.getSession().addMarker(highlightRange, 'selected-for-renaming', 'background'));
    });
    this._highlightMarkers = markers;
  },

  removeHighlights: function() {
    if (!this._highlightMarkers) {
      return;
    }
    var editor = this._editor;
    this._highlightMarkers.forEach(function(marker) {
      editor.getSession().removeMarker(marker);
    });
  }

//  insertAtCursorPosition: function(s) {
//    this._editor.insert(s);
//  }
};

module.exports = Ace;
