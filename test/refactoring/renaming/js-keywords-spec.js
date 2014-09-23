var getPositionOfOccurence = require('../../../src/refactoring/renaming.js');

describe('javascript token on cursor position', function () {
  it('should return empty array', function () {
    var sourceCode = 'function foo(){}';
    var currentCursorPosition = 0;
    expect(getPositionOfOccurence.getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([]);
  });
  it('should return two positions', function () {
    var sourceCode = 'var foo = function(){}; foo();';
    var currentCursorPosition = 5;
    expect(getPositionOfOccurence.getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 24]);
  });
});
