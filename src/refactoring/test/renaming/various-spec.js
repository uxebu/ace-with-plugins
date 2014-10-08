var RenameCandidates = require('../../rename-candidates');
var util = require('../../util');

function getRanges() {
  var irrelevantCursorPosition = 0;
  var candidates = new RenameCandidates('irrelevant source code', irrelevantCursorPosition);
  return candidates.getRanges();
}
function getCount() {
  var irrelevantCursorPosition = 0;
  var candidates = new RenameCandidates('irrelevant source code', irrelevantCursorPosition);
  return candidates.getCount();
}
function _fakeCandidates(refs) {
  spyOn(util, 'getXXX').andReturn(refs);
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
