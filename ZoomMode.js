var ZoomMode = (function() {
  var ZoomMode = new VromeMode({
    z: Action.zoomDefault,
    i: Action.zoomIn,
    o: Action.zoomOut,
    m: Action.zoomMore,
    r: Action.zoomReduce
  });


  var zoom_settings = {};
  var zoom_levels = ['30%', '50%', '67%', '80%', '90%', '100%', '110%', '120%', '133%', '150%', '170%', '200%', '240%', '300%'];
  var default_zoom_index = zoom_levels.indexOf('100%');

  return extend(ZoomMode, {
    changeZoom: function(countup) {
      var domain = document.domain;
      var now_zoom_level = zoom_settings[domain];
      if (now_zoom_level == undefined) {
	now_zoom_level = default_zoom_index;
      }
      var zoom_level;
      zoom_level = now_zoom_level + countup;
      if ( zoom_level <= 0 ) {
	zoom_level = 0;
      } else if (zoom_level >= zoom_levels.length) {
	zoom_level = zoom_levels.length - 1;
      }
      this.setZoom(zoom_level, domain);
    },

    setZoomDefault: function() {
      this.setZoom(default_zoom_index, document.domain);
    },

    setZoom: function(zoom_level, domain) {
      document.body.style.zoom = zoom_levels[zoom_level];
      if (zoom_level == default_zoom_index) {
	delete zoom_settings[domain];
      } else {
	zoom_settings[domain] = zoom_level;
      }
    },

    currentZoom: function() {
      var domain = document.domain;
      var zoom_level = zoom_settings[domain];
      if (zoom_level == undefined){
	return 1;
      }
      return ( parseInt(zoom_levels[zoom_level]) / 100 );
    }
  });
}());
