var Editor = require('../src/editor/editor');

function calculateAbsolutePositionOfCursor(cursorPosition, lenght){

}

describe('get cursor position', function () {
  xit('position of str in first line should be 4', function () {
    var codeAsString = 'var str = 4;';

    var cursorPosition = {
      row: 0,
      column: 4
    }
    expect(calculateAbsolutePositionOfCursor(cursorPosition, codeAsString.lenght)).toBe(4);
  });
});

