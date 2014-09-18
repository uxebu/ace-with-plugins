

//DONE
//one variable name
//two different variable names NOT NESCESSARY
//two equal variable names
//three equal variable names
//variable names with an uppercase char
//variable names with a lowdash char
//variable names with a number
//name in comment
//dont find reserved words:
//keywords

//TODO

var getPositionOfOccurence = require('../src/refactoring/renaming/renaming.js');

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

describe('find occurences in the right scope', function () {
  it('should find variable in function scope', function () {
    var sourceCode = 'function foo(){var test = 4;} var test = 8;';
    var currentCursorPosition = 21;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([19]);
  });
  it('should find variable outside of function scope', function () {
    var sourceCode = 'function foo(){var test = 4;} var test = 8;';
    var currentCursorPosition = 36;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([34]);
  });
  it('should find variables inside and outside of function scope', function () {
    var sourceCode = 'function foo(){test = 4;} var test = 8;';
    var currentCursorPosition = 34;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([30, 15]);
  });
  it('should find two variables in function scope', function () {
    var sourceCode = 'function foo(){var test = 4; test++;} var test = 8;';
    var currentCursorPosition = 21;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([19, 29]);
  });
});
