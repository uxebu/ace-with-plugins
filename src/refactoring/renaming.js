var esRefactorInterface = require('./esRefactorInterface');

function getPositionOfOccurence(sourceCode, currentCursorPosition) {
  var positions = esRefactorInterface.getReferencesFromEsRefactor(sourceCode, currentCursorPosition);
  return positions;
}

module.exports = {
  getPositionOfOccurence: getPositionOfOccurence
};
