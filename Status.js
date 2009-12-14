var Status = (function() {
  $(function() {
    $(document.body).append('<div id="__vrome_status_div"><span id="__vrome_status"/></div>');
  });

  return {
    show: function(msg, displayTime) {
      displayTime = displayTime || 1000;
      $('#__vrome_status').html(msg);
      $('#__vrome_status_div').show().animate(
        {
          width: '60%'
        }, {
          duration: 300,
          easing: 'swing',
          complete: function() {
            setTimeout(function() {
              $('#__vrome_status_div').fadeOut('fast', function () {
                $('#__vrome_status_div')[0].style.width = '20%';
              })
            }, displayTime);
          }
        }
      )
    }
  };
}());

