var esRefactorInterface = require('./esRefactorInterface');

function getPositionOfOccurence(sourceCode, currentCursorPosition) {
  return esRefactorInterface.getPositionsOfReferences(sourceCode, currentCursorPosition);
}

module.exports = {
  getPositionOfOccurence: getPositionOfOccurence
};
