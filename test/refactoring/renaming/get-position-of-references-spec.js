var renaming = require('../../../src/refactoring/renaming');
var esRefactorInterface = require('../../../src/refactoring/esRefactorInterface');

describe('mocking getPositionsOfReferences', function () {
  it('should check if getPositionsOfReferences is called with the right parameters', function () {
    var code = 'foo';
    var currentCursorPosition = 0;

    spyOn(esRefactorInterface, 'getPositionsOfReferences');
    renaming.getPositionOfOccurence(code, currentCursorPosition);
    expect(esRefactorInterface.getPositionsOfReferences).toHaveBeenCalledWith(code, currentCursorPosition);
  });
  it('should return five array elements', function () {
    var code = 'var foo';
    var currentCursorPosition = 4;

    spyOn(esRefactorInterface, 'getPositionsOfReferences').andReturn([1, 2, 3, 4, 5]);
    expect(renaming.getPositionOfOccurence(code, currentCursorPosition)).toEqual([1, 2, 3, 4, 5]);
  });
});
