var getPositionsOfCandidates = require('./util').getPositionsOfCandidates;

describe('javascript token on cursor position', function () {
  it('should not find function-keyword', function () {
    var sourceCode = 'function foo(){}';
    var currentCursorPosition = 0;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([]);
  });
  it('should not find ++', function () {
    var sourceCode = 'var xYz = 0; xYz++; xYz = 4;';
    var currentCursorPosition = 17;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([]);
  });
  it('should find a function name', function () {
    var sourceCode = 'var foo = function(){}; foo();';
    var currentCursorPosition = 4;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([4, 24]);
  });
});
