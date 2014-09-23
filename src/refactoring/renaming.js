var esrefactor = require('esrefactor');
var arrayUtil = require('../util/array');

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

/**
 * Get the cursor positions where to place renaming cursors, for identifiers
 * found at the given `cursorPosition`.
 */
var getCursorPositions = function(sourceCode, cursorPosition) {
  // Use `exports.*` explicitly, so we can mock it in the tests. Better ideas?
  var positions = exports.getPositionsOfCandidates(sourceCode, cursorPosition);
  var offset = arrayUtil.getSmallestDiffTo(positions, cursorPosition);
  return arrayUtil.addToEachElement(positions, offset);
};

var exports = {
  getPositionsOfCandidates: getPositionsOfCandidates,
  getCursorPositions: getCursorPositions
};
module.exports = exports;
