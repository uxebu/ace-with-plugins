var toAbsoluteCursorPosition = require('../cursor-position').toAbsolute;

var firstLine = 'line 0 ...0123456789';
var secondLine = '0123456789 line1 78';
var sourceCode = [
  firstLine,
  secondLine,
  'line 2 7890',
  'line 3'
].join('\n');

describe('calculate the absolute cursor position from given: row+column and sourcecode', function() {

  describe('on the first row', function() {
    it('for 0x0', function() {
      expect(toAbsoluteCursorPosition({row: 0, column: 0}, sourceCode)).toBe(0);
    });
    it('for 0x10', function() {
      expect(toAbsoluteCursorPosition({row: 0, column: 10}, sourceCode)).toBe(10);
    });
  });

  describe('on the second row', function() {
    var firstLineLength = firstLine.length + 1;
    it('for 1x0', function() {
      expect(toAbsoluteCursorPosition({row: 1, column: 0}, sourceCode)).toBe(firstLineLength);
    });
    it('for 1x10', function() {
      expect(toAbsoluteCursorPosition({row: 1, column: 10}, sourceCode)).toBe(firstLineLength + 10);
    });
  });

  describe('on the third row', function() {
    var twoLinesLength = firstLine.length + 1 + secondLine.length + 1;
    it('for 2x0', function() {
      expect(toAbsoluteCursorPosition({row: 2, column: 0}, sourceCode)).toBe(twoLinesLength);
    });
    it('for 2x3', function() {
      expect(toAbsoluteCursorPosition({row: 2, column: 3}, sourceCode)).toBe(twoLinesLength + 3);
    });
  });

  it('the last character', function() {
    var fullLength = sourceCode.length;
    expect(toAbsoluteCursorPosition({row: 3, column: 6}, sourceCode)).toBe(fullLength);
  });

});
