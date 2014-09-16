var Editor = require('../src/editor/editor');


function findLineBreakPosition(codeAsString) {
  var linebreak = /\n/;
  return codeAsString.search(linebreak);
}

describe('detect linebreak', function() {
  it('linebreak should be on position 12', function(){
    var codeAsString = 'var str = 4;\n';
    expect(findLineBreakPosition(codeAsString)).toBe(12);
  });
});

describe('get cursor position', function () {
  xit('position of str in first line should be 4', function () {
    var codeAsString = 'var str = 4;';
    //codeAsString.length == 12
    var cursorPosition = {
      row: 0,
      column: 4
    }
    expect(calculateAbsolutePositionOfCursor(cursorPosition, codeAsString.lenght)).toBe(4);
  });

  xit('position of str in second line should be 21', function () {
    var codeAsString = 'function foo(){}\nvar str = 4;';
    //codeAsString.length == 29

    var cursorPosition = {
      row: 1,
      column: 4
    }
    expect(calculateAbsolutePositionOfCursor(cursorPosition, codeAsString.lenght)).toBe(21);
  });
});