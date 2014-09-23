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
  var isCursorAtBeginningOfIdentifier = positions.indexOf(cursorPosition) > -1;
  if (isCursorAtBeginningOfIdentifier) {
    return positions;
  }
  var offset = _getClosestValueInArray(positions, cursorPosition);
  return _addToEachElementInArray(positions, offset);
};

function _addToEachElementInArray(arr, valueToAdd) {
  function addValue(pos) { return pos + valueToAdd; }
  return arr.map(addValue);
}

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
