var esrefactor = require('esrefactor');

function getPositionOfOccurence(sourceCode, currentCursorPosition) {
  var context = new esrefactor.Context(sourceCode);
  var identifier = context.identify(currentCursorPosition);

  if (identifier === undefined) {
    return [];
  }

  var positions = [];
  var index = -1;

  while (identifier.references.length > index + 1) {
    index++;
    positions.push(identifier.references[index].range[0]);
  }

  return positions;
}

module.exports = getPositionOfOccurence;
