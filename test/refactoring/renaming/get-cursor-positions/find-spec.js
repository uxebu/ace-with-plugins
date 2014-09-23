var renaming = require('../../../../src/refactoring/renaming');

var getCursorPositions = function(sourceCode, cursorPosition) {
  return renaming.getPositionsOfCandidates(sourceCode, cursorPosition);
};

/*
- all should be placed on the same letter

- find all at beginning of word
- on the second letter
- at the end of the word
 */

var sourceCode = 'xxx=1;xxx=2;';
//  cursor pos:   01234567890...

describe('', function() {

  beforeEach(function() {
    spyOn(renaming, 'getPositionsOfCandidates').andReturn([0, 6]);
  });

  describe('at beginning of variable', function() {

    it('when placed at the first occurence', function() {
      var cursorPosition = 0;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([0, 6]);
    });

    it('when placed at the second occurence', function() {
      var cursorPosition = 6;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([0, 6]);
    });
  });

});
