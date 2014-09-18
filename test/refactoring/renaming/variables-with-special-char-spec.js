var getPositionOfOccurence = require('../../../src/refactoring/renaming.js').getPositionsOfCandidates;

describe('simple source code, with special chars in occurences', function () {
  it('should return three positions', function () {
    var sourceCode = 'var xYz = 0; xYz++; xYz = 4;';
    var currentCursorPosition = 20;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13, 20]);
  });
  it('should return one position', function () {
    var sourceCode = 'var _xyz = 0; xyz++; xyz = 4; xyz++; xyz = 4;';
    var currentCursorPosition = 4;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4]);
  });
  it('should return three positions', function () {
    var sourceCode = 'var _ = 0; _++; _ = 4;';
    var currentCursorPosition = 4;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 11, 16]);
  });
  it('should return three positions', function () {
    var sourceCode = 'var _1 = 0; _1++; _1 = 4;';
    var currentCursorPosition = 12;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 12, 18]);
  });
});
