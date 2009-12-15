var NextPageMode = new VromeMode('NextPage', {
  ']': Action.nextPage
});

var PrevPageMode = new VromeMode('PrevPage', {
  '[': Action.prevPage
});

var NavMode = new VromeMode('Nav', {
  g: Action.scrollToTop,
  i: Action.focusFirstTextInput,
  u: Action.parentDirectory,
  U: Action.rootDirectory,
  t: Action.nextTab,
  T: Action.previousTab
});

var PassthroughMode = VromeMode.newSingleton({
  initialize: function() {
    this._super('Passthrough', {
      Esc: Action.normalMode
    });
    this.defaultNextMode = this;
  },
  _overrides: {
    activate: function() {
      localStorage.deactivateVrome = true;
      arguments.callee._super();
    }
  }
});

var TextInputMode = VromeMode.newSingleton({
  initialize: function() {
    this._super('TextInput', {
      'Esc': Action.blurFocus,
      'C-[': Action.blurFocus,
      // 'C-a': Action.moveFirstOrSelectAll,
      // 'C-e': Action.moveEnd,
      // 'C-f': Action.moveForward,
      // 'C-b': Action.moveBackward,
      // 'C-d': Action.deleteForward,
      // 'C-h': Action.deleteBackward,
      // 'C-w': Action.deleteBackwardWord,
    });
  },
  willHandleKeyDown: function(e) {
    var t = e.target;
    var tn = t.nodeName;
    return (tn == 'INPUT' || tn == 'TEXTAREA' || t.attributes.getNamedItem('contentEditable') != null);
  }
});

VromeMode.prototype.textInputMode = TextInputMode;



