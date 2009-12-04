var history = [];
var historyIdx = 0;

// chrome.browserAction.onClicked(function(tab) {
  // alert('click!');
// });

function cmdline() {
  return $('#__vrome_cmdline');
}

function cmdWindow() {
  return $('#__vrome_cmdline_div');
}

$(function() {
  $('body').append('<div id="__vrome_cmdline_div"><input id="__vrome_cmdline" type="text" /></div>');
  cmdline().keydown(function(e) {
    var key = KeyEvent.interpret(e.originalEvent);
    switch (key) {
      case 'Esc':
        cmdWindow().fadeOut();
        break;
      case 'Enter':
        cmdWindow().fadeOut();
        var input = this.value;
        history.unshift(input);
        var cmd = input[0], args = input.substring(1);
        switch (cmd) {
          case '/':
          Search.forward(args);
          break;
        }
    }
  });
});
