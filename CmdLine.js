var CmdLine = (function() {
  var cmdHistory = new HashWithDefault(function() { return [] });
  var workingCmdHistory, currentCmdHistory, cmdHistoryIdx;

  function cmdline() {
    return $('#__vrome_cmdline');
  }

  function cmdWindow() {
    return $('#__vrome_cmdline_frame');
  }

  function loadNextHistory() {
    loadHistory((cmdHistoryIdx + 1) % workingCmdHistory.length);
  }
  function loadPrevHistory() {
    loadHistory((cmdHistoryIdx - 1 + workingCmdHistory.length) % workingCmdHistory.length);
  }
  function loadHistory(idx) {
    workingCmdHistory[cmdHistoryIdx] = cmdline().val();
    cmdHistoryIdx = idx;
    cmdline().val(workingCmdHistory[cmdHistoryIdx]);
  }

  var CmdLineMode = VromeMode.newSingleton({
    initialize: function() {
      this._super('CmdLine', {
        Esc: finish,
        Up: loadPrevHistory,
        Down: loadNextHistory,
        'C-p': loadPrevHistory,
        'C-n': loadNextHistory,
        Enter: function() {
          finish(cmdline().val());
        }
      });
      this.defaultNextMode = this;
    },
    passToTextInput: false
  });

  $(function() {
    $(document.body).append('<div id="__vrome_cmdline_frame"><div id="__vrome_cmdline_anim"><span id="__vrome_cmdline_prompt"/><input id="__vrome_cmdline" type="text" /><span id="__vrome_cmdline_closebox">X</span></div></div>');
    $('#__vrome_cmdline_closebox').click(function() { finish() });

    cmdline().focus(function() {
      CmdLineMode.activate();
      Vrome.switchToNextMode();
    }).blur(function() {
      NormalMode.activate();
      Vrome.switchToNextMode();
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

  function finish(input) {
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
    tabopen: function(args) {
      Vrome.extension.openTab(cleanUrl($A(arguments).join(' ')));
    },
    open: function(url) {
      document.location = cleanUrl($A(arguments).join(' '));
    }
  };
  var commands = Object.keys(commandHandlers);

  function cleanUrl(url) {
    if (!url.match(/^(https?:\/\/)?[a-z0-9-]+\.[a-z0-9.-]+/i)) {
      return 'http://www.google.com/search?q=' + escape(url);
    }
    if (!url.match(/^http/)) {
      url = 'http://' + url;
    }
    return url;
  }

  function parseCmdLine(cmdline) {
    var args = $w(cmdline);
    var cmd = args.shift();
    var len = cmd.length;
    console.debug('resolving command: ' + cmd + ' (cmdline: ' + cmdline);
    var candidates = commands.select(function(command) { return (command.substring(0, len) == cmd) });
    switch (candidates.length) {
      case 1:
        commandHandlers[cmd].apply(null, args);
        break;
      case 0:
        Status.show("Unrecognized command: " + cmd);
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
