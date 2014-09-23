var Editor = require('../../../src/editor/editor');
var getPositionOfOccurence = require('../../../src/refactoring/renaming');
var esRefactorInterface = require('../../../src/refactoring/esRefactorInterface');

Editor.prototype._init = function () {};

describe('mocking getPositionsOfReferences', function() {
  it('should call getPositionsOfReferences with string', function(){
    var code = 'foo';
    var currentCursorPosition = 0;

    spyOn(esRefactorInterface, 'getPositionsOfReferences');

    getPositionOfOccurence.getPositionOfOccurence(code, currentCursorPosition);
    expect(esRefactorInterface.getPositionsOfReferences).toHaveBeenCalledWith(code, currentCursorPosition);
  });
});

