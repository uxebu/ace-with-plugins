var Editor = require('../editor');
var renaming = require('../../refactoring/renaming');

describe('Editor.turnOnRenameMode()', function() {

  var cursorPosition = 0x42;
  var editor;
  var aceEditor;
  var sourceCode = 'my pretty src';
  beforeEach(function() {
    aceEditor = {
      getAbsoluteCursorPosition: function() {},
      turnOnMultipleCursorsAt: function() {}
    };
    editor = new Editor(aceEditor);

    spyOn(renaming, 'getCursorPositions').andReturn([]);
    spyOn(editor, 'getContent').andCallFake(function() { return sourceCode; });
    spyOn(aceEditor, 'getAbsoluteCursorPosition').andCallFake(function() {return cursorPosition;});
    spyOn(aceEditor, 'turnOnMultipleCursorsAt');
  });

  function fakeRenamingPositionsFound(positions) {
    renaming.getCursorPositions.andReturn(positions);
  }

  describe('Contract(s) with `renaming` module (to get rename-info)', function() {

    it('should call `getCursorPositions()` with sourceCode+cursorPosition', function() {
      editor.turnOnRenameMode();
      expect(renaming.getCursorPositions).toHaveBeenCalledWith(sourceCode, cursorPosition);
    });

  });

  describe('result from `getCursorPositions()` shall be given correctly', function() {

    describe('to `turnOnMultipleCursorsAt()`', function() {

      it('for one result', function() {
        var positions = [cursorPosition];
        fakeRenamingPositionsFound(positions);
        editor.turnOnRenameMode();
        expect(aceEditor.turnOnMultipleCursorsAt).toHaveBeenCalledWith(positions);
      });

      it('for no result, not at all', function() {
        fakeRenamingPositionsFound([]);
        editor.turnOnRenameMode();
        expect(aceEditor.turnOnMultipleCursorsAt).not.toHaveBeenCalled();
      });

      it('for many results, with the current cursor position as the last element', function() {
        var positions = [cursorPosition, 1, 23];
        var expectedPositions = [1, 23, cursorPosition];
        fakeRenamingPositionsFound(positions);
        editor.turnOnRenameMode();
        expect(aceEditor.turnOnMultipleCursorsAt).toHaveBeenCalledWith(expectedPositions);
      });

      it('in case of an error, not at all', function() {
      });

    });

  });

});
