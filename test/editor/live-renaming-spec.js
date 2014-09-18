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
  var editor;
  beforeEach(function() {
    spyOn(mockEditorImplementation, 'onCursorMove');
    spyOn(mockEditorImplementation, 'setMultipleCursorsTo');
    mockEditorImplementation.onCursorMove.andCallFake(function(callback) {
      onCursorMoveCallback = callback;
    });
    spyOn(renaming, 'getPositionOfOccurence').andReturn([]);

    editor = new Editor(mockEditorImplementation);
    editor.enableLiveRenaming();
  });

  function fakeCursorMoveTo(pos) {
    onCursorMoveCallback && onCursorMoveCallback(pos);
  }

  function fakeThatRenamableVariablesWereFoundAt(cursorPositions) {
    renaming.getPositionOfOccurence.andReturn(cursorPositions);
  }

  it('should call `renaming.getPositionOfOccurence()` when cursor position changed', function() {
    var cursorPosition = 42;
    var sourceCode = editor.getContent();

    fakeCursorMoveTo(cursorPosition);
    expect(renaming.getPositionOfOccurence).toHaveBeenCalledWith(sourceCode, cursorPosition);
  });

  it('should NOT call `renaming.getPositionOfOccurence()` when cursor position had NOT changed', function() {
    expect(renaming.getPositionOfOccurence).not.toHaveBeenCalled();
  });

  describe('multiple cursors', function() {

    it('set when `getPositionOfOccurence()` returned some', function() {
      var cursorPositions = [0, 23, 42];
      fakeThatRenamableVariablesWereFoundAt(cursorPositions);
      fakeCursorMoveTo(0);
      expect(mockEditorImplementation.setMultipleCursorsTo).toHaveBeenCalledWith(cursorPositions);
    });

    it('set exactly those returned by `getPositionOfOccurence()`', function() {
      var cursorPositions = [0, 10, 20];
      fakeThatRenamableVariablesWereFoundAt(cursorPositions);
      fakeCursorMoveTo(0);
      expect(mockEditorImplementation.setMultipleCursorsTo).toHaveBeenCalledWith(cursorPositions);
    });

    it('DONT call `setMultipleCursorsTo` if `getPositionOfOccurence()` had not returned any', function() {
      fakeCursorMoveTo(0);
      expect(mockEditorImplementation.setMultipleCursorsTo).not.toHaveBeenCalled();
    });

  });
});
