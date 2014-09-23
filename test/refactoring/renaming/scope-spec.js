var getPositionOfOccurence = require('../../../src/refactoring/renaming.js');

describe('find occurences in the right scope', function () {
  it('should find variable in function scope', function () {
    var sourceCode = 'function foo(){var test = 4;} var test = 8;';
    var currentCursorPosition = 21;
    expect(getPositionOfOccurence.getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([19]);
  });
  it('should find variable outside of function scope', function () {
    var sourceCode = 'function foo(){var test = 4;} var test = 8;';
    var currentCursorPosition = 36;
    expect(getPositionOfOccurence.getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([34]);
  });
});
