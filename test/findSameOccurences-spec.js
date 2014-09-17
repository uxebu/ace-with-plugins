//one variable name

//two different variable names

//two equal variable names

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
  var word = sourceCode.substr(currentCursorPosition).match(/\w+/);
  if (word != 'var') {
    return [currentCursorPosition];
  }
  return [];
}

describe('simple source code, with none or one occurence', function () {
  it('should not find variable', function () {
    function getPositionOfOccurence(sourceCode, currentCursorPosition) {
      var context = new esrefactor.Context(sourceCode);
      var identifier = context.identify(currentCursorPosition);
      if (identifier === undefined) {
        identifier = [];
      }
      return identifier;
    }

    var sourceCode = 'var xyz = 0;';
    var currentCursorPosition = 0;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([]);
  });

  describe('one occurence', function() {
    it('should return correct position inside string', function(){
      function getPositionOfOccurence(sourceCode, currentCursorPosition) {
        var context = new esrefactor.Context(sourceCode);
        var identifier = context.identify(currentCursorPosition);
        if (identifier === undefined) {
          identifier = [];
        }
        return [identifier.references[0].range[0]];
      }


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













