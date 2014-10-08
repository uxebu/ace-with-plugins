var arrayUtil = require('../util/array');
var util = require('./util');

var renaming = {

  //getNodeIndexOfCandidates: function(sourceCode, currentCursorPosition) {
  //  var context = new esrefactor.Context(sourceCode);
  //  var identifier = context.identify(currentCursorPosition);
  //  if (identifier === undefined) {
  //    return [];
  //  }
  //  return _collectAllRefs(identifier).map(function(ref) { return ref.nodeIndex; });
  //},
  //
  //getRangesOfCandidates: function(sourceCode, currentCursorPosition) {
  //  var context = new esrefactor.Context(sourceCode);
  //  var identifier = context.identify(currentCursorPosition);
  //  if (identifier === undefined) {
  //    return [];
  //  }
  //  return _collectAllRanges(identifier);
  //}

};

//function _collectAllRefs(identifier) {
//  var startPositions = [];
//  startPositions = startPositions.concat(identifier.references);
//  if (identifier.declaration) {
//    var ref = identifier.declaration; // doesnt work i guess ...
//    if (startPositions.indexOf(ref) == -1) {
//      startPositions.unshift(ref); // Put it to the beginning of `startPositions`.
//    }
//  }
//  return startPositions;
//}
//
//function _collectAllRanges(identifier) {
//  var startPositions = [];
//  startPositions = startPositions.concat(identifier.references.map(function(ref) {
//    return ref.range;
//  }));
//  if (identifier.declaration) {
//    var startPos = identifier.declaration.range;
//    if (startPositions.indexOf(startPos) == -1) {
//      startPositions.unshift(startPos); // Put it to the beginning of `startPositions`.
//    }
//  }
//  return startPositions;
//}

//function _collectAllRangeStarts(identifier) {
//  var startPositions = [];
//  startPositions = startPositions.concat(identifier.references.map(function(ref) {
//    return ref.range[0];
//  }));
//  if (identifier.declaration) {
//    var startPos = identifier.declaration.range[0];
//    if (startPositions.indexOf(startPos) == -1) {
//      startPositions.unshift(startPos); // Put it to the beginning of `startPositions`.
//    }
//  }
//  return startPositions;
//}

module.exports = renaming;
