var NormalMode = new VromeMode({
  'j': Action.smoothScrollDown,
  'k': Action.smoothScrollUp,
  'h': Action.smoothScrollLeft,
  'l': Action.smoothScrollRight,
  'r': Action.reload,
  'R': Action.reloadAll,
  'd': Action.closeTab,
  'u': Action.reopenTab,
  'C-p': Action.previousTab,
  'C-n': Action.nextTab,
  'H': Action.historyBack,
  'L': Action.historyForward,
  'G': Action.scrollToBottom,
  '0': Action.scrollToFirst,
  '$': Action.scrollToLast,
  'Esc': Action.blurFocus,
  'C-[': Action.blurFocus,
  'g': Action.navMode,
  ']': Action.nextPageMode,
  '[': Action.prevPageMode,
  'z': Action.zoomMode,
  'f': Action.hintMode,
  'F': Action.newTabHintMode,
	'C-z': Action.passthroughMode,
	'/': Action.forwardSearch
});

VromeMode.prototype.defaultNextMode = NormalMode;

