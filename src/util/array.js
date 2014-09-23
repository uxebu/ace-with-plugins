var array = {
  addToEachElement: function(values, valueToAdd) {
    function addValue(pos) { return pos + valueToAdd; }
    return values.map(addValue);
  },

  getSmallestDiffTo: function(values, value) {
    function calculateDistance(aValue) { return value - aValue; }
    function notNegative(value) { return value >= 0 }
    function numericSort(a, b) { return a - b; }

    var sortedDistanceGreaterThanZero = values
        .map(calculateDistance)
        .filter(notNegative)
        .sort(numericSort)
      ;
    return sortedDistanceGreaterThanZero[0];
  },

  moveValueToEnd: function(values, valueToBeMovedToEnd) {
    return _removeValueFromArray(values, valueToBeMovedToEnd)
      .concat(valueToBeMovedToEnd);
  }
};

function _removeValueFromArray(values, valueToBeRemoved) {
  var foundAt = values.indexOf(valueToBeRemoved);
  var sliceBeforeValue = values.slice(0, foundAt);
  var sliceAfterValue = values.slice(foundAt + 1);
  return sliceBeforeValue.concat(sliceAfterValue);
}

module.exports = array;
