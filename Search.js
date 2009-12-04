var Search = (function() {
	var lastSearchString = null;
	var searchingForward = true;

	return {
		forward: function(string) {
			lastSearchString = string;
      console.debug('searching for ' + string);
			find(string);
		}
	};
}());
