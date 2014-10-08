var renaming = require('./renaming');

function RenameCodeAnalyzer(sourceCode, cursorPosition){
  this._sourceCode = sourceCode;
  this._cursorPosition = cursorPosition;

  var cursorPositions = renaming.getCursorPositions(this._sourceCode, this._cursorPosition);
  var numberOfCursorPositions = cursorPositions.length;
  var data = this._data = {
    numberOfCursorPositions: numberOfCursorPositions,
    cursorPositions: cursorPositions,
    candidateRanges: [],
    nodeIndexes: []
  };
  if (numberOfCursorPositions) {
    data.candidateRanges = renaming.getRangesOfCandidates(this._sourceCode, this._cursorPosition);
    data.nodeIndexes = renaming.getNodeIndexOfCandidates(this._sourceCode, this._cursorPosition);
  }
}
RenameCodeAnalyzer.prototype = {

  //getNumberOfCandidates: function() {
  //  return this._data.numberOfCursorPositions;
  //},
  //
  getCandidateAbsolutePositions: function() {
    return this._data.cursorPositions;
  },
  //
  //getCandidateRanges: function() {
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

module.exports = RenameCodeAnalyzer;
