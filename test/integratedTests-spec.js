var Editor = require('../src/editor/editor');

Editor.prototype._init = function () {};
Editor.prototype.getIdentifiedReferences = function (codeAsString, position) {
  return [1];
}


describe('mocking getIdentifiedReferences', function() {
  it('should call getIdentifiedReferences', function(){
    var editor = new Editor();

    spyOn(editor, 'getIdentifiedReferences');
    editor.getIdentifiedReferences();

    expect(editor.getIdentifiedReferences).toHaveBeenCalled();
  });
  it('should call getIdentifiedReferences with empty string', function(){
    var editor = new Editor();
    var code = ' ';
    var currentCursorPosition = 0;

    spyOn(editor, 'getIdentifiedReferences');
    editor.getIdentifiedReferences(code, currentCursorPosition);
    expect(editor.getIdentifiedReferences).toHaveBeenCalledWith(' ', 0);
  });
  it('should call getIdentifiedReferences with string', function(){
    var editor = new Editor();
    var code = 'foo';
    var currentCursorPosition = 0;

    spyOn(editor, 'getIdentifiedReferences');
    editor.getIdentifiedReferences(code, currentCursorPosition);
    expect(editor.getIdentifiedReferences).toHaveBeenCalledWith(code, currentCursorPosition);
  });
});

describe('stub getIdentifiedReferences', function() {
  it('should return array with one element', function(){
    var editor = new Editor();
    editor.getIdentifiedReferences();

    expect(editor.getIdentifiedReferences()).toEqual([1]);
  });
});
