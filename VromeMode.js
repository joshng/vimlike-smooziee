var VromeMode = Object.newSubclass({
  initialize: function(name, bindings) {
    this.name = name;
    this.bindings = bindings;
  },
  passToTextInput: true,
  handleKeyDown: function(key, e) {
    var action = this.bindings[key];
    if (action) {
      console.debug(this.name + ': handling key: ' + key);
      e.preventDefault();
      action.call(this);
      return true;
    }
    return false;
  },

  activate: function() {
    console.debug('Activating ' + this.name + 'Mode');
    Vrome.setNextMode(this);
  }
});
