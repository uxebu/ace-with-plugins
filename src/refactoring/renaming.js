var esrefactor = require('esrefactor');
var arrayUtil = require('../util/array');

var renaming = {
  getPositionsOfCandidates: function(sourceCode, currentCursorPosition) {
    var context = new esrefactor.Context(sourceCode);
    var identifier = context.identify(currentCursorPosition);
    if (identifier === undefined) {
      return [];
    }
    return _collectAllRangeStarts(identifier);
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

function _collectAllRangeStarts(identifier) {
  var startPositions = [];
  startPositions = startPositions.concat(identifier.references.map(function(ref) {
    return ref.range[0];
  }));
  if (identifier.declaration) {
    var startPos = identifier.declaration.range[0];
    if (startPositions.indexOf(startPos) == -1) {
      startPositions.unshift(startPos); // Put it to the beginning of `startPositions`.
    }
  }
  return startPositions;
}


module.exports = renaming;
