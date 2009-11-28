var SmoothScroller = (function() {
  var interval = 20;
  var vertical_moment = 250;
  var horizontal_moment = 100;
  var scrollTimeout;
  var scrollingVertically;

  return {
    scroll: function(multiplier, vertical) {
      var moment = multiplier * (vertical ? vertical_moment : horizontal_moment);

      scrollingVertically = vertical;
      clearTimeout(scrollTimeout);
      smoothScroll(moment);
    }
  };

  function smoothScroll(moment){
    if (moment > 0){
      moment = Math.floor(moment / 2);
    }else{
      moment = Math.ceil(moment / 2);
    }

    scrollFunc(moment);

    if (Math.abs(moment) < 1) {
      setTimeout(function() { scrollFunc(moment); });
      return;
    }

    scrollTimeout = setTimeout(function() { smoothScroll(moment); }, interval);
  }

  function scrollFunc(moment) {
    if (scrollingVertically) {
      scrollBy(0, moment);
    } else {
      scrollBy(moment, 0);
    }
  }
}());
