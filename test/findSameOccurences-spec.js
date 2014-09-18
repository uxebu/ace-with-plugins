

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
