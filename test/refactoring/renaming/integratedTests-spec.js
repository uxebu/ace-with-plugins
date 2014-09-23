var Editor = require('../../../src/editor/editor');
var getPositionOfOccurence = require('../../../src/refactoring/renaming');
var esRefactorInterface = require('../../../src/refactoring/esRefactorInterface');

Editor.prototype._init = function () {};

describe('mocking getReferencesFromEsRefactor', function() {
  it('should call getReferencesFromEsRefactor with string', function(){
    var code = 'foo';
    var currentCursorPosition = 0;

    spyOn(esRefactorInterface, 'getReferencesFromEsRefactor');

    getPositionOfOccurence.getPositionOfOccurence(code, currentCursorPosition);
    expect(esRefactorInterface.getReferencesFromEsRefactor).toHaveBeenCalledWith(code, currentCursorPosition);
  });
});
