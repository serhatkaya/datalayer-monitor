(() => {
  function enableLogging() {
    var script = document.createElement("script");
    const url = chrome.runtime.getURL("injector.js");
    script.src = url;
    (document.head || document.documentElement).appendChild(script);
    script.onload = function () {
      script.remove();
    };
  }

  chrome.storage.sync.get("loggingEnabled", ({ loggingEnabled }) => {
    if (loggingEnabled) {
      enableLogging();
    }
  });

  chrome.runtime.onMessage.addListener(({ toggleLogging }) => {
    if (toggleLogging) {
      chrome.storage.sync.get("loggingEnabled", ({ loggingEnabled }) => {
        if (loggingEnabled) {
          enableLogging();
        }
      });
    }
  });
})();
