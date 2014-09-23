var renaming = require('../../../src/refactoring/renaming');
var esRefactorInterface = require('../../../src/refactoring/esRefactorInterface');

describe('mocking getPositionsOfReferences', function() {
  it('should call getPositionsOfReferences with string', function(){
    var code = 'foo';
    var currentCursorPosition = 0;

    spyOn(esRefactorInterface, 'getPositionsOfReferences');

    renaming.getPositionOfOccurence(code, currentCursorPosition);
    expect(esRefactorInterface.getPositionsOfReferences).toHaveBeenCalledWith(code, currentCursorPosition);
  });
});