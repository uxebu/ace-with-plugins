var Editor = require('../../src/editor/editor');
var renaming = require('../../src/refactoring/renaming');

describe('Editor.renameAtCurrentPosition()', function() {

  var cursorPosition = 0x42;
  var editor;
  var aceEditor;
  var sourceCode = 'my pretty src';
  beforeEach(function() {
    aceEditor = {
      getAbsoluteCursorPosition: function() {},
      setMultipleCursorsTo: function() {}
    };
    editor = new Editor(aceEditor);

    spyOn(renaming, 'getCursorPositions').andReturn([]);
    spyOn(editor, 'getContent').andCallFake(function() { return sourceCode; });
    spyOn(aceEditor, 'getAbsoluteCursorPosition').andCallFake(function() {return cursorPosition;});
    spyOn(aceEditor, 'setMultipleCursorsTo');
  });

  function fakeRenamingPositionsFound(positions) {
    renaming.getCursorPositions.andReturn(positions);
  }

  describe('Contract(s) with `renaming` module (to get rename-info)', function() {

    it('should call `getCursorPositions()` with sourceCode+cursorPosition', function() {
      editor.renameAtCurrentPosition();
      expect(renaming.getCursorPositions).toHaveBeenCalledWith(sourceCode, cursorPosition);
    });

  });

  describe('result from `getCursorPositions()` shall be given correctly', function() {

    describe('to `setMultipleCursorsTo()`', function() {

      it('for one result', function() {
        var positions = [cursorPosition];
        fakeRenamingPositionsFound(positions);
        editor.renameAtCurrentPosition();
        expect(aceEditor.setMultipleCursorsTo).toHaveBeenCalledWith(positions);
      });

      it('for no result, not at all', function() {
        fakeRenamingPositionsFound([]);
        editor.renameAtCurrentPosition();
        expect(aceEditor.setMultipleCursorsTo).not.toHaveBeenCalled();
      });

      it('for many results, with the current cursor position as the last element', function() {
        var positions = [cursorPosition, 1, 23];
        var expectedPositions = [1, 23, cursorPosition];
        fakeRenamingPositionsFound(positions);
        editor.renameAtCurrentPosition();
        expect(aceEditor.setMultipleCursorsTo).toHaveBeenCalledWith(expectedPositions);
      });

      it('in case of an error, not at all', function() {
      });

    });

  });

});
