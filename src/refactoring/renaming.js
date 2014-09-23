var esrefactor = require('esrefactor');

function getPositionsOfCandidates(sourceCode, currentCursorPosition) {
  var context = new esrefactor.Context(sourceCode);
  var identifier = context.identify(currentCursorPosition);
  if (identifier === undefined) {
    return [];
  }
  return _extractPositionsFromReferences(identifier.references);
}

function _extractPositionsFromReferences(references) {
  return references.map(function(ref) {
    return ref.range[0];
  });
}

var getCursorPositions = function(sourceCode, cursorPosition) {
  // Use `exports.*` explicitly, so we can mock it in the tests. Better ideas?
  var positions = exports.getPositionsOfCandidates(sourceCode, cursorPosition);
  if (positions.indexOf(cursorPosition) == -1) {
    var offset = _getClosestValueInArray(positions, cursorPosition);
    function addOffsetToPosition(pos) { return pos + offset; }
    positions = positions.map(addOffsetToPosition);
  }
  return positions;
};

function _getClosestValueInArray(values, value) {
  function calculateDistance(aValue) { return value - aValue; }
  function aboveZero(value) { return value > 0 }
  function numericSort(a, b) { return a - b; }

  var sortedDistanceGreaterThanZero = values
    .map(calculateDistance)
    .filter(aboveZero)
    .sort(numericSort)
  ;
  return sortedDistanceGreaterThanZero[0];
}

var exports = {
  getPositionsOfCandidates: getPositionsOfCandidates,
  getCursorPositions: getCursorPositions
};
module.exports = exports;
