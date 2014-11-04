# Refactoring features
- factor `X.prototype.method=...` into `X.prototype = {method:...}` style and reverse
- " to ' converter

# Code smell finder
- find comments around sections of source code and offer automatic extraction into separate methods (in the same scope)
- find duplicated code (and offer extraction into method)
- many more ...
