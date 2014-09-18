function toAbsoluteCursorPosition(coordinates) {
  if (coordinates.column > 0) {
    return coordinates.column;
  }
  return 0;
}

var sourceCode = [
  'line 0 ...0123456789',
  '0123456789 line1 78',
  'line 2 7890',
  ''
].join('\n');

describe('calculate the absolute cursor position from given: row+column and sourcecode', function() {
  it('for 0x0', function() {
    expect(toAbsoluteCursorPosition({row: 0, column: 0}), sourceCode).toBe(0);
  });
  it('for 0x10', function() {
    expect(toAbsoluteCursorPosition({row: 0, column: 10}), sourceCode).toBe(10);
  });
});
