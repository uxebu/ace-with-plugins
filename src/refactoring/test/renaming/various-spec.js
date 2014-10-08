var RenameCandidates = require('../../rename-candidates');
var util = require('../../util');

function getCandidateObject() {
  var irrelevantCursorPosition = 0;
  return new RenameCandidates('irrelevant source code', irrelevantCursorPosition);
}

function getRanges() {
  return getCandidateObject().getRanges();
}
function getCount() {
  var irrelevantCursorPosition = 0;
  var candidates = new RenameCandidates('irrelevant source code', irrelevantCursorPosition);
  return candidates.getCount();
}
function _fakeCandidates(refs) {
  if (!util.getXXX.isSpy) {
    spyOn(util, 'getXXX');
  }
  util.getXXX.andReturn(refs);
}

describe('getRanges', function() {

  it('should extract only the ranges', function() {
    _fakeCandidates([{range: [0,6]}, {range: [10,20]}]);
    expect(getRanges()).toEqual([[0,6], [10,20]]);
  });

});

describe('getCount', function() {

  it('should return 0 candidates', function() {
    _fakeCandidates([]);
    expect(getCount()).toBe(0);
  });

  it('should return 2 candidates', function() {
    _fakeCandidates([{range: [0,6]}, {range: [10,20]}]);
    expect(getCount()).toBe(2);
  });

});

describe('getNodeIndexes', function() {

  function getNodeIndexes() {
    var irrelevantCursorPosition = 0;
    var candidates = new RenameCandidates('irrelevant source code', irrelevantCursorPosition);
    return candidates.getNodeIndexes();
  }

  it('should return 0 candidates', function() {
    _fakeCandidates([]);
    expect(getNodeIndexes()).toEqual([]);
  });

  it('should return 2 candidates', function() {
    _fakeCandidates([{nodeIndex: 1}, {nodeIndex: 23}]);
    expect(getNodeIndexes()).toEqual([1, 23]);
  });

});

describe('isSourceCodeIdentical', function() {

  describe('should return true', function() {
    it('for the same candidates', function() {
      _fakeCandidates([{nodeIndex: 1, range: [1,2]}, {nodeIndex: 23, range: [3,4]}]);
      var candidate = getCandidateObject();
      expect(candidate.isSourceCodeIdentical(candidate)).toBe(true);
    });

    it('for the same nodeIndexes', function() {
      _fakeCandidates([{nodeIndex: 1}, {nodeIndex: 42}]);
      var candidate1 = getCandidateObject();
      var candidate2 = getCandidateObject();
      expect(candidate1.isSourceCodeIdentical(candidate2)).toBe(true);
    });
  });

  describe('should return false', function() {

    it('for the different nodeIndexes', function() {
      _fakeCandidates([{nodeIndex: 1}]);
      var candidate1 = getCandidateObject();
      _fakeCandidates([{nodeIndex: 2}]);
      var candidate2 = getCandidateObject();
      expect(candidate1.isSourceCodeIdentical(candidate2)).toBe(false);
    });
  });

});
