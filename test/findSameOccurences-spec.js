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

function getPositionOfOccurence(sourceCode, currentCursorPosition) {
  var word = sourceCode.substr(currentCursorPosition).match(/\w+/);
  if (word != 'var') {
    return [currentCursorPosition];
  }
  return [];
}

describe('simple source code, with none or one occurence', function () {
  it('should not find variable', function () {
    var sourceCode = 'var xyz = 0;';
    var currentCursorPosition = 0;
    expect(getPositionOfOccurence(sourceCode, currentCursorPosition)).toEqual([]);
  });

  describe('one occurence', function() {
    it('should return correct position inside string', function(){
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













