var Editor = require('../../src/editor/editor');
var renaming = require('../../src/refactoring/renaming');

/*
* - get the positions of the renamables
* - pass those positions to the setMultipleCursorsTo() method of editor
* - the first position must be the current cursor position that
*   the cursor will be set to when the renaming mode is turned off
* */

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

    spyOn(renaming, 'getPositionsOfCandidates').andReturn([]);
    spyOn(editor, 'getContent').andCallFake(function() { return sourceCode; });
    spyOn(aceEditor, 'getAbsoluteCursorPosition').andCallFake(function() {return cursorPosition;});
    spyOn(aceEditor, 'setMultipleCursorsTo');
  });

  function fakeRenamingPositionsFound(positions) {
    renaming.getPositionsOfCandidates.andReturn(positions);
  }

  describe('Contract(s) with `renaming` module (to get rename-info)', function() {

    it('should call `getPositionsOfCandidates()` with sourceCode+cursorPosition', function() {
      editor.renameAtCurrentPosition();
      expect(renaming.getPositionsOfCandidates).toHaveBeenCalledWith(sourceCode, cursorPosition);
    });

  });

  describe('result from `getPositionsOfCandidates()` shall be given correctly', function() {

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
