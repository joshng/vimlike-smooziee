var CmdLine = (function() {
  var cmdHistory = new HashWithDefault(function() { return [] });
  var workingCmdHistory, currentCmdHistory, cmdHistoryIdx;

  function cmdline() {
    return $('#__vrome_cmdline');
  }

  function cmdWindow() {
    return $('#__vrome_cmdline_frame');
  }

  $(function() {
    $(document.body).append('<div id="__vrome_cmdline_frame"><div id="__vrome_cmdline_anim"><span id="__vrome_cmdline_prompt"/><input id="__vrome_cmdline" type="text" /><span id="__vrome_cmdline_closebox">X</span></div></div>');
    $('#__vrome_cmdline_closebox').click(hide);

    cmdline().keydown(function(e) {
      var key = KeyEvent.interpret(e.originalEvent);
      var stopEvent = true;
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
        default:
          stopEvent = false;
      }
      if (stopEvent) e.preventDefault();
    }).blur(function() {
      // hide();
    });
  });

  var selection;
  var commandCallback;
  function show(promptString, initialValue) {
    initialValue = initialValue || '';
    $('#__vrome_cmdline_prompt').html(promptString);
    selection = [];
    var sel = window.getSelection();
    for (var i = 0; i < sel.rangeCount; i++) {
      selection[i] = sel.getRangeAt(i);
    }
    currentCmdHistory = cmdHistory.get(promptString);
    workingCmdHistory = currentCmdHistory.clone();
    workingCmdHistory.unshift(initialValue);
    cmdHistoryIdx = 0;
    
    cmdWindow().show();
    $('#__vrome_cmdline_anim').addClass('__vrome_wiggle-in');
    cmdline().val(initialValue)[0].focus();
  }

  function hide(input) {
    if (input) {
      currentCmdHistory.unshift(input);
    }

    workingCmdHistory = currentCmdHistory = null;
    $('#__vrome_cmdline_anim').removeClass('__vrome_wiggle-in');
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

  var commandHandlers = {
    tabopen: Vrome.extension.openTab,
    open: function(url) {
      if (!url.match(/^http/)) {
        url = 'http://' + url;
      }
      document.location = url;
    }
  };
  var commands = Object.keys(commandHandlers);

  function parseCmdLine(cmdline) {
    var args = $w(cmdline);
    var cmd = args.shift();
    var len = cmd.length;
    console.debug('resolving command: ' + cmd + ' (cmdline: ' + cmdline);
    var candidates = commands.select(function(command) { return (command.substring(0, len) == cmd) });
    switch (candidates.length) {
      case 0:
        Status.show("Unrecognized command: " + cmd);
        break;
      case 1:
        commands[cmd].apply(null, args);
        break;
      default:
        Status.show("Ambiguous command: '" + cmd + "', could match: '" + candidates.sort().join("', '") + "'", 3000);
        break;
    }
  }

  return {
    search: function(promptString, initialValue, callback) {
      commandCallback = callback;
      show(promptString, initialValue);
    },
    getCmd: function(initialValue) {
      this.search(':', initialValue, parseCmdLine);
    }
  }
}());
