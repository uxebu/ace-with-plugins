var getPositionOfOccurence = require('../../../src/refactoring/renaming.js');

describe('javascript token on cursor position', function () {
  it('should return empty array', function () {
    var sourceCode = 'function foo(){}';
    var currentCursorPosition = 0;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([]);
  });
  it('should return empty array', function () {
    var sourceCode = 'var xYz = 0; xYz++; xYz = 4;';
    var currentCursorPosition = 17;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([]);
  });
  it('should return two positions', function () {
    var sourceCode = 'var foo = function(){}; foo();';
    var currentCursorPosition = 5;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 24]);
  });
});
