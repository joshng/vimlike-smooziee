var CmdLine = (function() {
  var cmdHistory = [];
  var cmdHistoryIdx = 0;

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
        case 'Enter':
          hide();
          // FALLTHROUGH
        default:
          var input = this.value;
          if (input) {
            commandCallback(input);
          }
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
    
    cmdWindow().fadeIn('fast');
    cmdline().val('')[0].focus();
  }

  function hide() {
    cmdWindow().hide();
    cmdline()[0].blur()
    var sel = window.getSelection();
    sel.removeAllRanges();
    selection.forEach(function(range) {
      sel.addRange(range);
    });
  }

  return {
    query: function(promptString, defaultString, callback) {
      commandCallback = callback;
      show(promptString);
    }
  }
}());
