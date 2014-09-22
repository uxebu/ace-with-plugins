var Editor = require('../../src/editor/editor');
var renaming = require('../../src/refactoring/renaming');

/*
* - get the positions of the renamables
* - pass those positions to the setMultipleCursorsTo() method of editor
* - the first position must be the current cursor position that
*   the cursor will be set to when the renaming mode is turned off
* */

describe('Editor.renameAtCurrentPosition()', function() {

  describe('Contract(s) with `renaming` module (to get rename-info)', function() {

    var cursorPosition = 0x42;
    var editor;
    var sourceCode = 'my pretty src';
    beforeEach(function() {
      var aceEditor = {
        getAbsoluteCursorPosition: function() { return cursorPosition }
      };
      editor = new Editor(aceEditor);
      spyOn(editor, 'getContent').andCallFake(function() { return sourceCode; });
      spyOn(renaming, 'getPositionsOfCandidates')
    });

    it('should call `getPositionsOfCandidates()` correctly', function() {
      editor.renameAtCurrentPosition();
      expect(renaming.getPositionsOfCandidates).toHaveBeenCalledWith(sourceCode, cursorPosition);
    });

  });

});
