function toRowColumnCursorPosition(absolutePosition, sourceCode) {
  var firstLine = sourceCode.split('\n')[0];
  if (absolutePosition < firstLine.length) {
    return {row: 0, column: absolutePosition};
  }
  return {row: 1, column: absolutePosition-firstLine.length};
}

var firstLine = 'line 0 ...0123456789';
var secondLine = '0123456789 line1 78';
var sourceCode = [
  firstLine,
  secondLine,
  'line 2 7890',
  'line 3'
].join('\n');

describe('calculate the row+column cursor position from given: absolute position and sourcecode', function() {

  describe('on the first line', function() {
    it('at 0', function() {
      expect(toRowColumnCursorPosition(0, sourceCode)).toEqual({row: 0, column: 0});
    });
    it('at 10 (still first line)', function() {
      expect(toRowColumnCursorPosition(10, sourceCode)).toEqual({row: 0, column: 10});
    });
  });

  describe('on the second line', function() {
    it('for 1x0', function() {
      expect(toRowColumnCursorPosition(20, sourceCode)).toEqual({row: 1, column: 0});
    });
//    it('for 1x10', function() {
//      expect(toRowColumnCursorPosition({row: 1, column: 10}, sourceCode)).toEqual(firstLineLength + 10);
//    });
  });

});
