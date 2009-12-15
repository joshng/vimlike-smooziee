var NormalMode = VromeMode.newSingleton({
  initialize: function() {
    this._super('Normal', {
      'j': Action.smoothScrollDown,
      'k': Action.smoothScrollUp,
      'h': Action.smoothScrollLeft,
      'l': Action.smoothScrollRight,
      'r': Action.reload,
      'R': Action.reloadAllTabs,
      'd': Action.closeTab,
      'u': Action.reopenTab,
      'C-p': Action.previousTab,
      'C-n': Action.nextTab,
      'o': Action.openUrl,
      'O': Action.editUrl,
      't': Action.openTab,
      ':': Action.showCommandLine,
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
      '/': Action.forwardSearch,
      '?': Action.backwardSearch,
      'n': Action.repeatSearch,
      'N': Action.reverseSearch,
      'Enter': Action.followSelectedLink
    });
  },
  _overrides: {
    activate: function() {
      delete localStorage['deactivateVrome'];
      arguments.callee._super();
    }
  }
});

VromeMode.prototype.defaultNextMode = NormalMode;
