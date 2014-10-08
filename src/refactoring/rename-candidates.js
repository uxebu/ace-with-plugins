var renaming = require('./renaming');

function RenameCandidates(sourceCode, cursorPosition){
  this._sourceCode = sourceCode;
  this._cursorPosition = cursorPosition;

  var cursorPositions = renaming.getCursorPositions(this._sourceCode, this._cursorPosition);
  var numberOfCursorPositions = cursorPositions.length;
  var data = this._data = {
    numberOfCursorPositions: numberOfCursorPositions,
    absolutePositions: cursorPositions,
    //candidateRanges: [],
    //nodeIndexes: []
  };
  //if (numberOfCursorPositions) {
  //  data.candidateRanges = renaming.getRangesOfCandidates(this._sourceCode, this._cursorPosition);
  //  data.nodeIndexes = renaming.getNodeIndexOfCandidates(this._sourceCode, this._cursorPosition);
  //}
}
RenameCandidates.prototype = {

  //getCount: function() {
  //  return this._data.numberOfCursorPositions;
  //},
  //
  getAbsolutePositions: function() {
    return this._data.absolutePositions;
  },
  //
  //getRanges: function() {
  //  return this._data.candidateRanges;
  //},
  //
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
