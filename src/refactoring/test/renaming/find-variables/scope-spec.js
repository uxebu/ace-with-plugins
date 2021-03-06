var getPositionsOfCandidates = require('./util').getPositionsOfCandidates;

describe('find occurences in the right scope', function () {
  it('should find variable in function scope', function () {
    var sourceCode = 'function foo(){var test = 4;} var test = 8;';
    var currentCursorPosition = 19;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([19]);
  });
  it('should find variable outside of function scope', function () {
    var sourceCode = 'function foo(){var test = 4;} var test = 8;';
    var currentCursorPosition = 34;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([34]);
  });
  it('should find variables inside and outside of function scope', function () {
    var sourceCode = 'function foo(){test = 4;} var test = 8;';
    var currentCursorPosition = 30;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([30, 15]);
  });
  it('should find two variables in function scope', function () {
    var sourceCode = 'function foo(){var test = 4; test++;} var test = 8;';
    var currentCursorPosition = 19;
    expect(getPositionsOfCandidates(sourceCode, currentCursorPosition)).toEqual([19, 29]);
  });
});
