function VromeMode(bindings) {
  this.bindings = bindings;
}

VromeMode.prototype = {
  handleKeyDown: function(e) {
    var key = KeyEvent.interpret(e);
    console.debug('handling key: ' + key);
    var action = this.bindings[key];
    if (action) {
      e.preventDefault();
      action.call(this);
      return true;
    }
    return false;
  },

  activate: function() {
    Vrome.setNextMode(this);
  }
};