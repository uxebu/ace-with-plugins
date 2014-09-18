function toAbsoluteCursorPosition(coordinates, sourceCode) {
  var absolutePosition = coordinates.column;
  var row = 0;
  while (coordinates.row > row) {
    absolutePosition += sourceCode.split('\n')[row].length + 1;
    row++;
  }
  return absolutePosition;
}

function toRowColumnCursorPosition(absolutePosition, sourceCode) {
  var lines = sourceCode.split('\n');

  var row = 0;
  var lineLengths = 0;
  while (absolutePosition > lineLengths + lines[row].length) {
    lineLengths += lines[row].length + 1;
    row++;
  }
  return {row: row, column: absolutePosition - lineLengths};
}

module.exports = {
  toAbsoluteCursorPosition: toAbsoluteCursorPosition,
  toRowColumnCursorPosition: toRowColumnCursorPosition
};
