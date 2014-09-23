var toRowColumnCursorPosition = require('../../src/util/cursor-position').toRowColumn;

var firstLine =  '12345';
var secondLine = '123';
var sourceCode = [
  firstLine,
  secondLine,
  '1',
  ''
].join('\n');

describe('calculate the row+column cursor position from given: absolute position and sourcecode', function() {

  describe('on the first line', function() {
    it('at 0', function() {
      expect(toRowColumnCursorPosition(0, sourceCode)).toEqual({row: 0, column: 0});
    });
    it('at 10 (still first line)', function() {
      expect(toRowColumnCursorPosition(4, sourceCode)).toEqual({row: 0, column: 4});
    });
  });

  describe('after the first line', function() {
    it('line 2', function() {
      expect(toRowColumnCursorPosition(6, sourceCode)).toEqual({row: 1, column: 0});
    });
    it('line 3, for 41', function() {
      expect(toRowColumnCursorPosition(11, sourceCode)).toEqual({row: 2, column: 1});
    });
    it('1 char lines, line 5', function() {
      var sourceCode =
        '1\n' +
        '2\n' +
        '3\n' +
        '4\n' +
        '5\n'
        ;
      expect(toRowColumnCursorPosition(8, sourceCode)).toEqual({row: 4, column: 0});
    });
  });

});
