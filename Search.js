var Search = (function() {
  var linkHighlightClass = '__vrome_link_highlight';

  var lastSearchString = '';
  var searchingBackward = true;
  var selectedLink;


  var uppercasePattern = /[A-Z]/;
  function caseSensitive(searchString) {
    return searchString.match(uppercasePattern) != null;
  }

  return {
    find: function(string, backward, opposite) {
      if (selectedLink) {
        $(selectedLink).removeClass(linkHighlightClass);
        selectedLink = null;
      }
      if (string) {
        lastSearchString = string;
      } else {
        string = lastSearchString;
      }
      searchingBackward = backward;
      var reallyBackward = opposite ^ backward;
      if (window.find(string, caseSensitive(string), reallyBackward)) {
        var anchorNode = window.getSelection().anchorNode;
        if (anchorNode.nodeName == 'A') {
          selectedLink = anchorNode;
        } else if (anchorNode.parentElement.nodeName == 'A') {
          selectedLink = anchorNode.parentElement;
        }

        if (selectedLink) {
          console.debug('selected link: ' + selectedLink.href);
          $(selectedLink).addClass(linkHighlightClass);
        }
      } else {
        Status.show("Not found: " + string);
        // TODO: this isn't working; if the search fails, we should collapse any misleading
        // selection
        if (reallyBackward) {
          window.getSelection().collapseToStart();
        } else {
          window.getSelection().collapseToEnd();
        }
      }

    },

    followSelectedLink: function() {
      if (!selectedLink) return;
      document.location = selectedLink.href;
    },

    repeat: function(oppositeDirection) {
      this.find(lastSearchString, searchingBackward, oppositeDirection);
    },

    getLastSearchString: function() {
      return lastSearchString;
    }
  };
}());
