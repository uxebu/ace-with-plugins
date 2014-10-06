var renaming = require('../../renaming');
var getCursorPositions = renaming.getCursorPositions;

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

  describe('on the second letter', function() {
    it('when placed at the first occurence', function() {
      var cursorPosition = 1;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([1, 7]);
    });

    it('when placed at the second occurence', function() {
      var cursorPosition = 7;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([1, 7]);
    });
  });

  describe('end of the variable', function() {
    it('when placed at the first occurence', function() {
      var cursorPosition = 2;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([2, 8]);
    });

    it('when placed at the second occurence', function() {
      var cursorPosition = 8;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([2, 8]);
    });
  });
});

describe('longer source code with various cases', function() {

  beforeEach(function() {
    sourceCode =   'abc=1;abc=2;if(abc){return Abc;}';
    // cursor pos:  012345678901234567890123456789
  });

  describe('find many renamables', function() {
    beforeEach(function() {
      spyOn(renaming, 'getPositionsOfCandidates').andReturn([0, 6, 15]);
    });

    it('when placed at the first occurence', function() {
      var cursorPosition = 0;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([0, 6, 15]);
    });

    it('when placed at the end of the second occurence', function() {
      var cursorPosition = 8;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([2, 8, 17]);
    });
  });

  describe('find none or one renamable', function() {

    it('placed over a variable that occurs only once', function() {
      spyOn(renaming, 'getPositionsOfCandidates').andReturn([27]);
      var cursorPosition = 27;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([27]);
    });

    it('placed over a non-variable that occurs only once', function() {
      spyOn(renaming, 'getPositionsOfCandidates').andReturn([]);
      var cursorPosition = 20;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([]);
    });

    it('placed on the last variable', function() {
      spyOn(renaming, 'getPositionsOfCandidates').andReturn([4, 12, 18]);
      var cursorPosition = 20;
      expect(getCursorPositions('', cursorPosition)).toEqual([6, 14, 20]);
    });

  });
});
