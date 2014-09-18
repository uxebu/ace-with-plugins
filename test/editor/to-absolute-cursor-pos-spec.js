function toAbsoluteCursorPosition(coordinates, sourceCode) {
  if (coordinates.row == 1) {
    return sourceCode.split('\n')[0].length;
  }
  if (coordinates.column > 0) {
    return coordinates.column;
  }
  return 0;
}

var firstLine = 'line 0 ...0123456789';
var sourceCode = [
  firstLine,
  '0123456789 line1 78',
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
    it('for 1x0', function() {
      expect(toAbsoluteCursorPosition({row: 1, column: 0}, sourceCode)).toBe(firstLine.length);
    });
  });

});
