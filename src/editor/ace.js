var renaming = require('../refactoring/renaming');
var EventEmitter = require('events').EventEmitter;
var util = require('./_util');

function Ace(domNodeId) {
  this._domNodeId = domNodeId;
  this._init();
  this._eventEmitter = new EventEmitter();
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

    var self = this;
    editor.selection.on('changeCursor', function (_, selection) {
      var sourceCode = self.getContent();
      self._eventEmitter.emit('cursorMove', util.toAbsoluteCursorPosition(selection.getCursor(), sourceCode));
    });
  },

  setContent: function(content) {
    this._editor.selectAll();
    this._editor.insert(content);
  },

  getContent: function() {
    return this._editor.getValue()
  },

  onCursorMove: function(callback) {
    this._eventEmitter.addListener('cursorMove', callback);
  }

//  insertAtCursorPosition: function(s) {
//    this._editor.insert(s);
//  }
};

module.exports = Ace;
