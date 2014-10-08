var getPositionsOfCandidates = require('./util').getPositionsOfCandidates;

describe('should find declaration ONLY', function () {
  it('function declaration', function () {
    var sourceCode = 'function foo(){}';
    var currentCursorPosition = 9;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([9]);
  });
  it('variable declaration', function () {
    var sourceCode = 'var foo;';
    var currentCursorPosition = 4;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([4]);
  });
});

describe('should find declaration and usage', function () {
  it('when cursor is over the declaration', function () {
    var sourceCode = 'function foo(){}; foo();';
    var currentCursorPosition = 9;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([9, 18]);
  });
});
