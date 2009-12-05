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
      window.find(string, caseSensitive(string), opposite ^ backward);
    },

    repeat: function(oppositeDirection) {
      this.find(lastSearchString, searchingBackward, oppositeDirection);
    },

    getLastSearchString: function() {
      return lastSearchString;
    }
	};
}());
