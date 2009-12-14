var Action = {
  smoothScrollDown: function(){
    SmoothScroller.scroll(1, true);
  },

  smoothScrollUp: function(){
    SmoothScroller.scroll(-1, true);
  },

  smoothScrollRight: function(){
    SmoothScroller.scroll(1, false);
  },

  smoothScrollLeft: function(){
    SmoothScroller.scroll(-1, false);
  },

  scrollToTop: function(){
    scroll(0, -document.documentElement.scrollHeight);
  },

  scrollToBottom: function(){
    scroll(0, document.documentElement.scrollHeight);
  },

  scrollToFirst: function(){
    var scrollTop  = document.body.scrollTop  || document.documentElement.scrollTop;
    scroll(-document.documentElement.scrollWidth, scrollTop);
  },

  scrollToLast: function(){
    var scrollTop  = document.body.scrollTop  || document.documentElement.scrollTop;
    scroll(document.documentElement.scrollWidth, scrollTop);
  },

  parentDirectory: function() {
    if (location.pathname != '/') {
      var segments = location.pathname.split('/');
      segments.splice(segments.length - 1, 1);
      location.pathname = segments.join('/');
    } else {
      var segments = location.hostname.split('.');
      if (segments.length > 2) {
        segments.shift();
        document.location = location.protocol + '//' + segments.join('.');
      }
    }
  },

  rootDirectory: function() {
    location.pathname = '/';
  },

  reload: function(){
    location.reload();
  },

  historyBack: function(){
    history.back();
  },

  historyForward: function(){
    history.forward();
  },

  zoomDefault: function() {
    ZoomMode.setZoomDefault();
  },

  zoomIn: function() {
    ZoomMode.changeZoom(1);
  },

  zoomOut: function() {
    ZoomMode.changeZoom(-1);
  },

  zoomMore: function() {
    ZoomMode.changeZoom(3);
  },

  zoomReduce: function() {
    ZoomMode.changeZoom(-3);
  },

  navMode: function(){
    NavMode.activate();
  },

  nextPageMode: function() {
    NextPageMode.activate();
  },

  prevPageMode: function() {
    PrevPageMode.activate();
  },

  nextPage: function(){
    elems = document.getElementsByTagName('a');
    for(var cur in elems){
      if(new RegExp('>>|下一页|»|Next|more*','im').test(elems[cur].innerText)){
        document.location = elems[cur].href;
      }
    }
  },

  prevPage: function(){
    elems = document.getElementsByTagName('a');
    for(var cur in elems){
      if(new RegExp('<<|«|上一页|Prev','im').test(elems[cur].innerText)){
        document.location = elems[cur].href;
      }
    }
  },

  zoomMode: function(){
    ZoomMode.activate();
  },

  hintMode: function() {
    HintMode.activate(false);
  },

  newTabHintMode: function() {
    HintMode.activate(true);
  },

  focusFirstTextInput: function(){
    var elem = document.querySelector('input[type="text"],input:not([type])');
    if (elem) {
      elem.focus();
      elem.setSelectionRange(elem.value.length, elem.value.length);
    }
  },

  // Actions that apply within text inputs
  blurFocus: function(){
    document.activeElement.blur();
  },

  moveFirstOrSelectAll: function(){
    var elem = document.activeElement;
    var caret_position = elem.selectionEnd;
    if (caret_position == 0){
      elem.setSelectionRange(0, elem.value.length); // select all text
    } else {
      elem.setSelectionRange(0, 0);
    }
  },

  moveEnd: function(){
    var elem = document.activeElement;
    elem.setSelectionRange(elem.value.length, elem.value.length);
  },

  moveForward: function(){
    var elem = document.activeElement;
    var caret_position = elem.selectionEnd;
    elem.setSelectionRange(caret_position + 1, caret_position + 1);
  },

  moveBackward: function(){
    var elem = document.activeElement;
    var caret_position = elem.selectionEnd;
    elem.setSelectionRange(caret_position - 1, caret_position - 1);
  },

  deleteForward: function(){
    var elem = document.activeElement;
    var caret_position = elem.selectionEnd;
    var org_str = elem.value;
    elem.value = org_str.substring(0, caret_position) + org_str.substring(caret_position + 1, org_str.length);
    elem.setSelectionRange(caret_position, caret_position);
  },

  deleteBackward: function(){
    var elem = document.activeElement;
    var caret_position = elem.selectionEnd;
    var org_str = elem.value;
    elem.value = org_str.substring(0, caret_position - 1) + org_str.substring(caret_position, org_str.length);
    elem.setSelectionRange(caret_position - 1, caret_position - 1);
  },

  deleteBackwardWord: function(){
    var elem = document.activeElement;
    var caret_position = elem.selectionEnd;
    var org_str = elem.value;
    elem.value = org_str.substring(0, caret_position - 1).replace(/\S*\s*$/,'') + org_str.substring(caret_position, org_str.length);
    var position = elem.value.length - (org_str.length - caret_position);
    elem.setSelectionRange(position,position);
  },

  openUrl: function() {
    CmdLine.getCmd('open ');
  },

  openTab: function() {
    CmdLine.getCmd('tabopen ');
  },

  editUrl: function() {
    CmdLine.getCmd('open ' + location.href);
  },

  showCommandLine: function() {
    CmdLine.getCmd('');
  },

	forwardSearch: function() {
    CmdLine.search('Forward search: /', '', function(searchString) {
      Search.find(searchString);
    }); 
    // cmdWindow().fadeIn();
    // cmdline().val('/')[0].focus();
	},

  backwardSearch: function() {
    CmdLine.search('Backward search: ?', '', function(searchString) {
      Search.find(searchString, true);
    }); 
  },

  repeatSearch: function() {
    Search.repeat();
  },

  reverseSearch: function() {
    Search.repeat(true);
  },

  followSelectedLink: function() {
    Search.followSelectedLink();
  },

  normalMode: function() { NormalMode.activate(); },

  passthroughMode: function() { PassthroughMode.activate(); }
};

Object.extend(Action, Vrome.extensionMethods.reject(function(m) { return Action[m] }).mapTo(function(m) { return Vrome.extension[m] })._object);
