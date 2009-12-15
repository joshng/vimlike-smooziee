var closed_tabs = [];
var now_tab;

chrome.tabs.getSelected(null, function(tab) {
  now_tab = tab;
});

chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    now_tab = tab;
  });
});

chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if (now_tab && now_tab.id == tab.id) {
      now_tab = tab;
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  if(now_tab) {
    closed_tabs.push(now_tab);
  };
}); 

var Extension = {
  closeTab: function(tab) {
    chrome.tabs.remove(tab.id);
  },
  reopenTab: function() {
    if (closed_tabs.length > 0) {
      var last_closed_tab = closed_tabs[closed_tabs.length - 1]
      closed_tabs.pop();
      chrome.tabs.create({url: last_closed_tab.url, index: last_closed_tab.index});
    }
  },
  nextTab: function(tab) {
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      var next_tab = tabs[tab.index + 1] || tabs[0];
      if (next_tab) {
        chrome.tabs.update(next_tab.id, {selected: true});
      }
    });
  },
  previousTab: function(tab) {
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      var previous_tab = tabs[tab.index - 1] || tabs[tabs.length - 1];
      if (previous_tab) {
        chrome.tabs.update(previous_tab.id, {selected: true});
      }
    });
  },
  openTab: function(url, tab) {
    chrome.tabs.create({url: url, index: tab.index + 1});
    chrome.tabs.connect(tab.id).postMessage({action: "remove_hints"});
  },
  reloadAllTabs: function(tab) {
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        var jsRunner = {"code": "location.reload()"};
        chrome.tabs.executeScript(tabs[i].id, jsRunner);
      }
    });
  }
};
chrome.extension.onConnect.addListener(function(port, name) {
  port.onMessage.addListener(function(msg) {
    var tab = port.tab;
    console.debug('got msg: ' + JSON.stringify(msg));

    var handler = Extension[msg.method];
    if (!handler) {
      alert('Vrome: unrecognized extension command: ' + msg.method)
      return;
    }
    var args = JSON.parse(msg.args);
    args.push(tab);
    handler.apply(Extension, args);
  });
});

