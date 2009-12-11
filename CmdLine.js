var CmdLine = (function() {
  var cmdHistory = new HashWithDefault(function() { return [] });
  var workingCmdHistory, currentCmdHistory, cmdHistoryIdx;

  function cmdline() {
    return $('#__vrome_cmdline');
  }

  function cmdWindow() {
    return $('#__vrome_cmdline_div');
  }

  $(function() {
    $(document.body).append('<div id="__vrome_cmdline_div"><span id="__vrome_cmdline_prompt"/><input id="__vrome_cmdline" type="text" /><span id="__vrome_cmdline_closebox">X</span></div>');
    $('#__vrome_cmdline_closebox').click(hide);

    cmdline().keydown(function(e) {
      var key = KeyEvent.interpret(e.originalEvent);
      switch (key) {
        case 'Esc':
          hide();
          break;
        case 'Up':
        case 'C-p':
          workingCmdHistory[cmdHistoryIdx] = this.value;
          cmdHistoryIdx = (cmdHistoryIdx + 1) % workingCmdHistory.length;
          this.value = workingCmdHistory[cmdHistoryIdx];
          break;
        case 'Down':
        case 'C-n':
          workingCmdHistory[cmdHistoryIdx] = this.value;
          cmdHistoryIdx = (cmdHistoryIdx - 1 + workingCmdHistory.length) % workingCmdHistory.length;
          this.value = workingCmdHistory[cmdHistoryIdx];
          break;
        case 'Enter':
          hide(this.value);
          break;
      }
    }).blur(function() {
      hide();
    });
  });

  var selection;
  var commandCallback;
  function show(promptString) {
    $('#__vrome_cmdline_prompt').html(promptString);
    selection = [];
    var sel = window.getSelection();
    for (var i = 0; i < sel.rangeCount; i++) {
      selection[i] = sel.getRangeAt(i);
    }
    currentCmdHistory = cmdHistory.get(promptString);
    workingCmdHistory = currentCmdHistory.clone();
    workingCmdHistory.unshift('');
    cmdHistoryIdx = 0;
    
    cmdWindow().fadeIn('fast');
    cmdline().val('')[0].focus();
  }

  function hide(input) {
    if (input) {
      currentCmdHistory.unshift(input);
    }

    workingCmdHistory = currentCmdHistory = null;
    cmdWindow().hide();
    cmdline()[0].blur()
    var sel = window.getSelection();
    sel.removeAllRanges();
    selection.forEach(function(range) {
      sel.addRange(range);
    });

    if (input) {
      commandCallback(input);
    }
  }

  return {
    query: function(promptString, defaultString, callback) {
      commandCallback = callback;
      show(promptString);
    }
  }
}());
