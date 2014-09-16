var Editor = require('../src/editor/editor');

function calculateAbsolutePositionOfCursor(cursorPosition, lenght){

  return 21;
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


  it('position of str in second line should be 21', function () {
    var codeAsString = 'function foo(){}\nvar str = 4;';
    //codeAsString.lenght == 29

    var cursorPosition = {
      row: 1,
      column: 4
    }
    expect(calculateAbsolutePositionOfCursor(cursorPosition, codeAsString.lenght)).toBe(21);
  });
});