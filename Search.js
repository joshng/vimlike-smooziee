var Search = (function() {
	var lastSearchString = '';
	var searchingBackward = true;


  var uppercasePattern = /[A-Z]/;
  function caseSensitive(searchString) {
    return searchString.match(uppercasePattern) != null;
  }

	return {
    find: function(string, backward, opposite) {
      if (string) {
        lastSearchString = string;
      } else {
        string = lastSearchString;
      }
      searchingBackward = backward;
      var reallyBackward = opposite ^ backward;
      if (!window.find(string, caseSensitive(string), reallyBackward)) {
        // TODO: this isn't working; if the search fails, we should collapse any misleading
        // selection
        if (reallyBackward) {
          window.getSelection().collapseToStart();
        } else {
          window.getSelection().collapseToEnd();
        }
      }
    },

    repeat: function(oppositeDirection) {
      this.find(lastSearchString, searchingBackward, oppositeDirection);
    },

    getLastSearchString: function() {
      return lastSearchString;
    }
	};
}());
