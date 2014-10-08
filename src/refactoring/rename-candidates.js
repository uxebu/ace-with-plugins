var arrayUtil = require('../util/array');
var util = require('./util');

function RenameCandidates(sourceCode, cursorPosition){
  this._cursorPosition = cursorPosition;
  this._candidates = util.getXXX(sourceCode, cursorPosition);
}
RenameCandidates.prototype = {

  getCount: function() {
    return this._candidates.length;
  },

  /**
   * Get the absolute cursor positions where to place renaming cursors, for identifiers
   * found at the given `this._cursorPosition`.
   * Takes into account that the cursor might not stand at the beginning of the word.
   */
  getAbsolutePositions: function() {
    function _getStartOfRanges(refs) {
      return refs.map(function(ref) { return ref.range[0]; });
    }

    var positions = _getStartOfRanges(this._candidates);
    var offset = arrayUtil.getSmallestDiffTo(positions, this._cursorPosition);
    return arrayUtil.addToEachElement(positions, offset);
  },

  getRanges: function() {
    return this._candidates.map(function(ref) { return ref.range });
  },

  //getNodeIndexes: function() {
  //  return this._data.nodeIndexes;
  //},
  //
  //isSourceCodeIdentical: function(analyzer) {
  //  var myIndexes = this.getNodeIndexes();
  //  var otherIndexes = analyzer.getNodeIndexes();
  //  if (myIndexes && otherIndexes) {
  //    if (otherIndexes.join('-') !== myIndexes.join('-')) {
  //      return false;
  //    }
  //  }
  //  return true;
  //}
};

module.exports = RenameCandidates;
