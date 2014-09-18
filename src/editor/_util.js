function toAbsoluteCursorPosition(coordinates, sourceCode) {
  var absolutePosition = coordinates.column;
  var row = 0;
  while (coordinates.row > row) {
    absolutePosition += sourceCode.split('\n')[row].length + 1;
    row++;
  }
  return absolutePosition;
}

module.exports = {
  toAbsoluteCursorPosition: toAbsoluteCursorPosition
};
