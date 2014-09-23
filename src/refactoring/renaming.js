var esrefactor = require('esrefactor');

function getPositionsOfCandidates(sourceCode, currentCursorPosition) {
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

var getCursorPositions = function(sourceCode, cursorPosition) {
  // Use exports explicitly, so we can mock it in the tests. Better ideas?
  var positions = exports.getPositionsOfCandidates(sourceCode, cursorPosition);
  if (positions.indexOf(cursorPosition) == -1) {
    var diff = _getClosestDiff(positions, cursorPosition);
    positions = positions.map(function(pos) { return pos + diff; });
  }
  return positions;
};

function _getClosestDiff(values, value) {
  function numericSort(a,b) { return a-b; }
  return (values
    .map(function(aValue) { return value - aValue; })
    .filter(function(value) { return value > 0 })
    .sort(numericSort)
  )[0];
}

var exports = {
  getPositionsOfCandidates: getPositionsOfCandidates,
  getCursorPositions: getCursorPositions
};
module.exports = exports;
