var Vrome = (function(){
  console.debug('loading vim-mode (Vrome)');

  function handleKeyDown(e) {
    var key = KeyEvent.interpret(e);
    if (!key) return;

    if (TextInputMode.willHandleKeyDown(e)) {
      TextInputMode.handleKeyDown(key, e);
      return;
    }

    nextMode = currentMode.defaultNextMode;
    currentMode.handleKeyDown(key, e);
    Vrome.switchToNextMode();
  }

  document.addEventListener('keydown', handleKeyDown, false);

  var nextMode, currentMode;

	chrome.extension.onConnect.addListener(function(port, name) {
		port.onMessage.addListener(function(msg) {
			switch (msg.action) {
				case "forward_search":
					Search.forward(msg.search_string);
					break;
			}
		});
	});
	

  var extensionPort = chrome.extension.connect();

  var extensionMethods = $w('closeTab reopenTab previousTab nextTab openUrl openTab reloadAllTabs');

  var extensionProxy = extensionMethods.mapTo(function(method) {
    return function() {
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
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
