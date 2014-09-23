var getPositionOfOccurence = require('../../../src/refactoring/renaming.js').getPositionsOfCandidates;

describe('simple source code, with none or one occurence', function () {
  it('should not find variable', function () {
    var sourceCode = 'var xyz = 0;';
    var currentCursorPosition = 0;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([]);
  });

  describe('one occurence', function () {
    it('should return correct position inside string', function () {
      var sourceCode = 'var xyz = 0;';
      var currentCursorPosition = 4;
      expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4]);
    });
    it('should return correct position at beginning of string', function () {
      var sourceCode = 'xyz = 0;';
      var currentCursorPosition = 0;
      expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([0]);
    });
  });
});

describe('simple source code, with two occurence', function () {
  it('should return two positions', function () {
    var sourceCode = 'var xyz = 0; xyz++';
    var currentCursorPosition = 4;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13]);

  });
  it('should return two positions when cursor is at second occurence', function () {
    var sourceCode = 'var xyz = 0; xyz++';
    var currentCursorPosition = 13;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13]);
  });
});

describe('simple source code, with three or more occurences', function () {
  it('should return three positions', function () {
    var sourceCode = 'var xyz = 0; xyz++; xyz = 4;';
    var currentCursorPosition = 20;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13, 20]);
  });
  it('should return five positions', function () {
    var sourceCode = 'var xyz = 0; xyz++; xyz = 4; xyz++; xyz = 4;';
    var currentCursorPosition = 20;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13, 20, 29, 36]);
  });
});
