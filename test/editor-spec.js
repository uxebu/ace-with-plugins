var Editor = require('../src/editor/editor');

function findLineBreakPosition(codeAsString) {
  var linebreak = /\n/;
  return codeAsString.search(linebreak);
}

function calculateAbsolutePositionOfCursor(lines, cursorPosition) {
  var absolutePosition = 0;

  if (lines.length > 1) {
    for (var i = 0; i < lines.length-1; i++) {
      absolutePosition += lines[i].length;
      console.log('Absolute Position', absolutePosition);
    }
    return absolutePosition += cursorPosition.column + 1;
  }
  else {
    return cursorPosition.column;
  }
}

describe('detect linebreak', function () {
  it('linebreak should be on position 12', function () {
    var codeAsString = 'var str = 4;\n';
    expect(findLineBreakPosition(codeAsString)).toBe(12);
  });
});

describe('get absolute cursor position', function () {
  it('position of str in first line should be 4', function () {
    var lines = ['var str = 4;'];

    var cursorPosition = {
      row: 0,
      column: 4
    }
    expect(calculateAbsolutePositionOfCursor(lines, cursorPosition)).toBe(4);
  });

  it('position of str in second line should be 21', function () {
    var lines = ['function foo(){}', 'var str = 4;'];

    var cursorPosition = {
      row: 1,
      column: 4
    }
    expect(calculateAbsolutePositionOfCursor(lines, cursorPosition)).toBe(21);
  });
});
