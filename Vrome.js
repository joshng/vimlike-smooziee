var Vrome = (function(){
  console.debug('loading vim-mode (Vrome)');

  function handleKeyDown(e) {
    if (TextInputMode.willHandleKeyDown(e)) {
      TextInputMode.handleKeyDown(e);
      return;
    }

    nextMode = currentMode.defaultNextMode;
    currentMode.handleKeyDown(e);
    Vrome.switchToNextMode();
  }

  document.addEventListener('keydown', handleKeyDown, false);

  var nextMode = NormalMode;
  var currentMode = nextMode;

	chrome.extension.onConnect.addListener(function(port, name) {
		port.onMessage.addListener(function(msg) {
			switch (msg.action) {
				case "forward_search":
					Search.forward(msg.search_string);
					break;
			}
		});
	});
	

  return {
    setNextMode: function(mode) {
      nextMode = mode;
    },

    switchToNextMode: function() {
      currentMode = nextMode;
    },
  };
})();

var exclude_urls = [/\/\/www\.google\.[^\/]+\/(reader|search)/,  /\/\/mail\.google\.com\//, /\/\/www\.pivotaltracker\.com\//];

for (var i = 0; i < exclude_urls.length; i++) {
  if (exclude_urls[i].test(location.href)) {
    PassthroughMode.activate();
    break;
  }
}

Vrome.switchToNextMode();
