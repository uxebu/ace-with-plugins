var esrefactor = require('esrefactor');
var arrayUtil = require('../util/array');

var renaming = {
  getPositionsOfCandidates: function(sourceCode, currentCursorPosition) {
    var context = new esrefactor.Context(sourceCode);
    var identifier = context.identify(currentCursorPosition);
    if (identifier === undefined) {
      return [];
    }
    return _extractPositionsFromReferences(identifier.references);
  },

  /**
   * Get the cursor positions where to place renaming cursors, for identifiers
   * found at the given `cursorPosition`.
   */
  getCursorPositions: function(sourceCode, cursorPosition) {
    var positions = renaming.getPositionsOfCandidates(sourceCode, cursorPosition);
    var offset = arrayUtil.getSmallestDiffTo(positions, cursorPosition);
    return arrayUtil.addToEachElement(positions, offset);
  }
};

function _extractPositionsFromReferences(references) {
  return references.map(function(ref) {
    return ref.range[0];
  });
}


module.exports = renaming;
