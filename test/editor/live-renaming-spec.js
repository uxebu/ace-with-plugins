var Editor = require('../../src/editor/editor');
var renaming = require('../../src/refactoring/renaming');

describe('live renaming', function() {

  var sourceCode = 'var foo = "bar"; foo = "FOO";';
  // position:      01234567890    5    012345678
  var mockEditorImplementation = {
    getContent: function() {
      return sourceCode;
    },
    onCursorMove: function() {}
  };

  var onCursorMoveCallback;
  beforeEach(function() {
    spyOn(mockEditorImplementation, 'onCursorMove');
    mockEditorImplementation.onCursorMove.andCallFake(function(callback) {
      onCursorMoveCallback = callback;
    });
    spyOn(renaming, 'getPositionOfOccurence');
  });

  function fakeCursorPositionChangeTo(pos) {
    onCursorMoveCallback && onCursorMoveCallback(pos);
  }

  it('should call `renaming.getPositionOfOccurence()` when cursor position changed', function() {
    var editor = new Editor(mockEditorImplementation);
    editor.enableLiveRenaming();

    var cursorPosition = 42;
    fakeCursorPositionChangeTo(cursorPosition);

    var sourceCode = editor.getContent();
    expect(renaming.getPositionOfOccurence).toHaveBeenCalledWith(sourceCode, cursorPosition);
  });
});
