var Editor = require('../src/editor/editor');
var Ace = require('../src/editor/ace');

var index = require('../src/index');

describe('publicly provide', function() {

  beforeEach(function() {
    spyOn(Ace.prototype, 'setDomNodeId');
  });

  it('a function that returns an instance of Editor', function() {
    expect(index() instanceof Editor).toBe(true);
  });
  it('should pass the domNodeId to the Ace constructor', function() {
    var domNodeId = 'foo bars';
    index(domNodeId);
    expect(Ace.prototype.setDomNodeId).toHaveBeenCalledWith(domNodeId);
  });
});
