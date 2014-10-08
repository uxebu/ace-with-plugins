function RenameModeWatcher(editor, numCursors) {
  this._editor = editor;
  this._numCursors = numCursors;
}

RenameModeWatcher.prototype = {

  onContentOrCursorChange: function(cb) {
    // This can only be called ONCE, currently.
    this._onCursorOrContentChange(cb);
  },

  stopWatching: function() {
    this._offCursorOrContentChange();
  },

  _contentChangesCount: 0,
  _onCursorContentChangeHandle: null,
  _onCursorOrContentChange: function(cb) {
    var self = this;
    function onContentChange() {
      // Count all content changes, it fires as often as there are cursors :( lets only handle the last one.
      if (self._contentChangesCount < self._numCursors-1) {
        self._contentChangesCount++;
        return;
      }
      self._contentChangesCount = 0;
      cb();
    }
    function onCursorChange() {
      // Ignore cursor position change event while a content change is ongoing.
      if (self._contentChangesCount > 0) {
        return;
      }
      cb();
    }

    this._editor.onSourceCodeChange(onContentChange);
    this._editor.onCursorPositionsChange(onCursorChange);
    this._onCursorContentChangeHandle = [onContentChange, onCursorChange];
  },

  _offCursorOrContentChange: function() {
    var handle = this._onCursorContentChangeHandle;
    this._editor.offSourceCodeChange(handle[0]);
    this._editor.offCursorPositionsChange(handle[1]);
  }

};

module.exports = RenameModeWatcher;
