var VromeMode = Object.newSubclass({
  initialize: function(bindings) {
    this.bindings = bindings;
  },
  handleKeyDown: function(key, e) {
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
});
