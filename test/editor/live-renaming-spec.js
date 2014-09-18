var Editor = require('../../src/editor/editor');
var renaming = require('../../src/refactoring/renaming');

describe('live renaming', function() {

  var sourceCode = 'var foo = "bar"; foo = "FOO";';
  // position:      01234567890    5    012345678
  var mockEditorImplementation = {
    getContent: function() {
      return sourceCode;
    },
    onCursorMove: function() {},
    setMultipleCursorsTo: function() {}
  };

  var onCursorMoveCallback;
  beforeEach(function() {
    spyOn(mockEditorImplementation, 'onCursorMove');
    spyOn(mockEditorImplementation, 'setMultipleCursorsTo');
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

  it('should NOT call `renaming.getPositionOfOccurence()` when cursor position had NOT changed', function() {
    var editor = new Editor(mockEditorImplementation);
    editor.enableLiveRenaming();

    expect(renaming.getPositionOfOccurence).not.toHaveBeenCalled();
  });

  it('should trigger setting of multiple cursors when `getPositionOfOccurence()` returned some', function() {
    var editor = new Editor(mockEditorImplementation);
    editor.enableLiveRenaming();

    var cursorPositions = [0, 23, 42];
    renaming.getPositionOfOccurence.andReturn(cursorPositions);

    fakeCursorPositionChangeTo(0);

    expect(mockEditorImplementation.setMultipleCursorsTo).toHaveBeenCalledWith(cursorPositions);
  });
});
