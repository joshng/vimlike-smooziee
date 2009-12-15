var NextPageMode = new VromeMode({
  ']': Action.nextPage
});

var PrevPageMode = new VromeMode({
  '[': Action.prevPage
});

var NavMode = new VromeMode({
  g: Action.scrollToTop,
  i: Action.focusFirstTextInput,
  u: Action.parentDirectory,
  U: Action.rootDirectory,
  t: Action.nextTab,
  T: Action.previousTab
});

var PassthroughMode = VromeMode.newSingleton({
  initialize: function() {
    this._super({
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
    this._super({
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



