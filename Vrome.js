var Vrome = (function(){
  console.debug('loading vim-mode (Vrome)');

  function handleKeyDown(e) {
    var key = KeyEvent.interpret(e);
    if (!key) return;

    if (currentMode.passToTextInput && TextInputMode.willHandleKeyDown(e)) {
      TextInputMode.handleKeyDown(key, e);
      return;
    }

    nextMode = currentMode.defaultNextMode;
    currentMode.handleKeyDown(key, e);
    Vrome.switchToNextMode();
  }

  document.addEventListener('keydown', handleKeyDown, false);

  var nextMode, currentMode;

  var extensionPort = chrome.extension.connect();

  var extensionMethods = $w('closeTab reopenTab previousTab nextTab openUrl openTab reloadAllTabs');

  var extensionProxy = extensionMethods.mapTo(function(method) {
    return function() {
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        // this JSON.stringify seems incorrect, but there's apparently a bug in JSON.stringify
        // that breaks the serialization in postMessage below; this is a workaround.
        // see http://code.google.com/p/chromium/issues/detail?id=30300
        args[i] = JSON.stringify(arguments[i]);
      }
      // var callback;
      // if (Object.isFunction(args.last())) {
        // callback = args.pop();
      // }
      extensionPort.postMessage({method: method, args: args});
    }
  })._object;

  return {
    setNextMode: function(mode) {
      nextMode = mode;
    },

    switchToNextMode: function() {
      currentMode = nextMode;
    },

    extension: extensionProxy,
    extensionMethods: extensionMethods
  };
})();

var exclude_urls = [/\/\/www\.google\.[^\/]+\/(reader|search)/,  /\/\/mail\.google\.com\//, /\/\/www\.pivotaltracker\.com\//];

$(function() {
  var passthrough = localStorage.deactivateVrome;
  if (!passthrough) {
    for (var i = 0; i < exclude_urls.length; i++) {
      if (exclude_urls[i].test(location.href)) {
        passthrough = true;
        break;
      }
    }
  }

  if (passthrough) {
    PassthroughMode.activate();
  } else {
    NormalMode.activate();
  }
  Vrome.switchToNextMode();
});
