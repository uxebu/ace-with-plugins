//DONE
//one variable name
//two different variable names NOT NESCESSARY
//two equal variable names

//TODO

//three equal variable names

//variable names with an uppercase char

//variable names with a number

//variable names with a lowdash char

//variable and name in comment

//dont find reserved words:
//keywords
//properties

var esrefactor = require('esrefactor');

function getPositionOfOccurence(sourceCode, currentCursorPosition) {
  var context = new esrefactor.Context(sourceCode);
  var identifier = context.identify(currentCursorPosition);
  if (identifier === undefined) {
    return [];
  }

  var positions = [];


  if (identifier.references.length > 0) {
    positions.push(identifier.references[0].range[0]);
  }
  if (identifier.references.length > 1) {
    positions.push(identifier.references[1].range[0]);
  }
  if (identifier.references.length > 2) {
    positions.push(identifier.references[2].range[0])
  }
  if (identifier.references.length > 4) {
    positions.push(identifier.references[3].range[0])
    positions.push(identifier.references[4].range[0])
  }
  return positions;
}

describe('simple source code, with none or one occurence', function () {
  it('should not find variable', function () {
    var sourceCode = 'var xyz = 0;';
    var currentCursorPosition = 0;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([]);
  });

  describe('one occurence', function () {
    it('should return correct position inside string', function () {
      var sourceCode = 'var xyz = 0;';
      var currentCursorPosition = 4;
      expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4]);
    });
    it('should return correct position at beginning of string', function () {
      var sourceCode = 'xyz = 0;';
      var currentCursorPosition = 0;
      expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([0]);
    });
  });
});

describe('simple source code, with two occurence', function () {
  it('should return two positions', function () {
    var sourceCode = 'var xyz = 0; xyz++';
    var currentCursorPosition = 4;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13]);

  });
  it('should return two positions when cursor is at second occurence', function () {
    var sourceCode = 'var xyz = 0; xyz++';
    var currentCursorPosition = 13;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13]);
  });
});

describe('simple source code, with three or more occurences', function () {
  it('should return three positions', function () {
    var sourceCode = 'var xyz = 0; xyz++; xyz = 4;';
    var currentCursorPosition = 20;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13, 20]);
  });
  it('should return five positions', function () {
    var sourceCode = 'var xyz = 0; xyz++; xyz = 4; xyz++; xyz = 4;';
    var currentCursorPosition = 20;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([4, 13, 20, 29, 36]);
  });
});











