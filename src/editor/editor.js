  function Editor(domNodeId) {
    this._domNodeId = domNodeId;
    this._init();
  }

  Editor.prototype = {

    _init: function() {
      ace.require("ace/ext/language_tools");
      var editor = ace.edit(this._domNodeId);
      editor.getSession().setMode('ace/mode/javascript');
      editor.setOptions({
        enableBasicAutocompletion: true
      });

      editor.getSession().setTabSize(2);
      document.getElementById(this._domNodeId).style.fontSize = '12px';
      document.getElementById(this._domNodeId).style.backgroundColor = 'white';
      this._editor = editor;
    },

    setContent: function(content) {
      this._editor.selectAll();
      this._editor.insert(content);
    },

    getContent: function() {
      return this._editor.getValue()
    },

    insertAtCursorPosition: function(s) {
      this._editor.insert(s);
    }
  };

  module.exports = Editor;