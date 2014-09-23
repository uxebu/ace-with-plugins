function addToEachElement(values, valueToAdd) {
  function addValue(pos) { return pos + valueToAdd; }
  return values.map(addValue);
}

function getSmallestDiffTo(values, value) {
  function calculateDistance(aValue) { return value - aValue; }
  function notNegative(value) { return value >= 0 }
  function numericSort(a, b) { return a - b; }

  var sortedDistanceGreaterThanZero = values
    .map(calculateDistance)
    .filter(notNegative)
    .sort(numericSort)
  ;
  return sortedDistanceGreaterThanZero[0];
}

function _removeValueFromArray(values, valueToBeRemoved) {
  var foundAt = values.indexOf(valueToBeRemoved);
  var sliceBeforeValue = values.slice(0, foundAt);
  var sliceAfterValue = values.slice(foundAt + 1);
  return sliceBeforeValue.concat(sliceAfterValue);
}

function moveValueToEndOfArray(values, valueToBeMovedToEnd) {
  return _removeValueFromArray(values, valueToBeMovedToEnd)
    .concat(valueToBeMovedToEnd);
}

module.exports = {
  addToEachElement: addToEachElement,
  getSmallestDiffTo: getSmallestDiffTo,
  moveValueToEnd: moveValueToEndOfArray
};
