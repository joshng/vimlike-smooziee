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

var PassthroughMode = new VromeMode({
  Esc: Action.normalMode
});
PassthroughMode.defaultNextMode = PassthroughMode;

var TextInputMode = new VromeMode({
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

TextInputMode.willHandleKeyDown = function(e) {
  var t = e.target;
  var tn = t.nodeName;
  return (tn == 'INPUT' || tn == 'TEXTAREA' || t.attributes.getNamedItem('contentEditable') != null);
};


