var Editor = require('../../src/editor/editor');
var renaming = require('../../src/refactoring/renaming');

describe('live renaming', function() {

  var mockEditorImplementation = {
    getContent: function() {return 'irrelevant, just will be compared';},
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
    spyOn(renaming, 'getPositionsOfCandidates').andReturn([]);

    editor = new Editor(mockEditorImplementation);
    editor.enableLiveRenaming();
  });

  function fakeCursorMoveTo(pos) {
    onCursorMoveCallback && onCursorMoveCallback(pos);
  }

  function fakeThatRenamableVariablesWereFoundAt(cursorPositions) {
    renaming.getPositionsOfCandidates.andReturn(cursorPositions);
  }


  

  it('should call `renaming.getPositionsOfCandidates()` when cursor position changed', function() {
    var cursorPosition = 42;
    var sourceCode = editor.getContent();

    fakeCursorMoveTo(cursorPosition);
    expect(renaming.getPositionsOfCandidates).toHaveBeenCalledWith(sourceCode, cursorPosition);
  });

  it('should NOT call `renaming.getPositionsOfCandidates()` when cursor position had NOT changed', function() {
    expect(renaming.getPositionsOfCandidates).not.toHaveBeenCalled();
  });

  describe('multiple cursors', function() {

    it('set exactly those returned by `getPositionsOfCandidates()`', function() {
      var cursorPositions = [0, 10, 20];
      fakeThatRenamableVariablesWereFoundAt(cursorPositions);
      fakeCursorMoveTo(0);
      expect(mockEditorImplementation.setMultipleCursorsTo).toHaveBeenCalledWith(cursorPositions);
    });

    it('DONT call `setMultipleCursorsTo` if `getPositionsOfCandidates()` had not returned any', function() {
      fakeCursorMoveTo(0);
      expect(mockEditorImplementation.setMultipleCursorsTo).not.toHaveBeenCalled();
    });

  });
});
