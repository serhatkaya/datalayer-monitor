let loggingEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ loggingEnabled });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.toggleLogging) {
    loggingEnabled = !loggingEnabled;
    chrome.storage.sync.set({ loggingEnabled });
    sendResponse({ loggingEnabled });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript(
          {
            target: { tabId },
            func: function (enabled) {
              window.postMessage({ type: "toggledm", data: enabled });
            },
            args: [loggingEnabled],
          },
          () => {}
        );
      }
    });
  }
});
