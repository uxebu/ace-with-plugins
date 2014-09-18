function toAbsoluteCursorPosition(coordinates, sourceCode) {
  var absolutePosition = coordinates.column;
  if (coordinates.row > 0) {
    absolutePosition += sourceCode.split('\n')[0].length;
  }
  if (coordinates.row > 1) {
    absolutePosition += sourceCode.split('\n')[1].length;
  }
  return absolutePosition;
}

var firstLine = 'line 0 ...0123456789';
var secondLine = '0123456789 line1 78';
var sourceCode = [
  firstLine,
  secondLine,
  'line 2 7890',
  ''
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
    var firstLineLength = firstLine.length;
    it('for 1x0', function() {
      expect(toAbsoluteCursorPosition({row: 1, column: 0}, sourceCode)).toBe(firstLineLength);
    });
    it('for 1x10', function() {
      expect(toAbsoluteCursorPosition({row: 1, column: 10}, sourceCode)).toBe(firstLineLength + 10);
    });
  });

  describe('on the third row', function() {
    var twoLinesLength = firstLine.length + secondLine.length;
    it('for 2x0', function() {
      expect(toAbsoluteCursorPosition({row: 2, column: 0}, sourceCode)).toBe(twoLinesLength);
    });
    it('for 2x3', function() {
      expect(toAbsoluteCursorPosition({row: 2, column: 3}, sourceCode)).toBe(twoLinesLength + 3);
    });
  });

});
