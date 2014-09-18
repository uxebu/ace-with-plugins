function toAbsoluteCursorPosition(coordinates) {
  if (coordinates.column > 0) {
    return coordinates.column;
  }
  return 0;
}

describe('calculate the absolute cursor position from given: row+column and sourcecode', function() {
  it('for 0x0', function() {
    expect(toAbsoluteCursorPosition({row: 0, column: 0})).toBe(0);
  });
  it('for 0x10', function() {
    expect(toAbsoluteCursorPosition({row: 0, column: 10})).toBe(10);
  });
});
