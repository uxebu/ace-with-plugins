var renaming = require('../../../../src/refactoring/renaming');

var getCursorPositions = function(sourceCode, cursorPosition) {
  var positions = renaming.getPositionsOfCandidates(sourceCode, cursorPosition);
  if (positions.indexOf(cursorPosition) == -1) {
    var diff = _getClosestDiff(positions, cursorPosition);
    positions = positions.map(function(pos) { return pos + diff; });
  }
  return positions;
};

function _getClosestDiff(values, value) {
  return (values
    .map(function(aValue) { return value - aValue; })
    .filter(function(value) { return value > 0 })
    .sort()
  )[0];
}

/*
- all should be placed on the same letter

- find all at beginning of word
- on the second letter
- at the end of the word
 */

var sourceCode = 'xxx=1;xxx=2;';
//  cursor pos:   01234567890...

describe('', function() {

  beforeEach(function() {
    spyOn(renaming, 'getPositionsOfCandidates').andReturn([0, 6]);
  });

  describe('at beginning of variable', function() {

    it('when placed at the first occurence', function() {
      var cursorPosition = 0;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([0, 6]);
    });

    it('when placed at the second occurence', function() {
      var cursorPosition = 6;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([0, 6]);
    });
  });

  describe('on the second letter', function() {
    it('when placed at the first occurence', function() {
      var cursorPosition = 1;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([1, 7]);
    });

    it('when placed at the second occurence', function() {
      var cursorPosition = 7;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([1, 7]);
    });
  });

  describe('end of the variable', function() {
    it('when placed at the first occurence', function() {
      var cursorPosition = 2;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([2, 8]);
    });

    it('when placed at the second occurence', function() {
      var cursorPosition = 8;
      expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([2, 8]);
    });
  });
});

describe('longer source code with various cases', function() {

  beforeEach(function() {
    sourceCode =   'abc=1;abc=2;if(abc){return Abc;}';
    // cursor pos:  012345678901234567890123456789
    spyOn(renaming, 'getPositionsOfCandidates').andReturn([0, 6, 15]);
  });

  it('when placed at the first occurence', function() {
    var cursorPosition = 0;
    expect(getCursorPositions(sourceCode, cursorPosition)).toEqual([0, 6, 15]);
  });
});
