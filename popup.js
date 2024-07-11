document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("loggingEnabled", ({ loggingEnabled }) => {
    const toggleLogging = document.getElementById("toggleLogging");
    toggleLogging.checked = loggingEnabled;

    toggleLogging.addEventListener("change", () => {
      chrome.runtime.sendMessage({ toggleLogging: true }, (response) => {
        toggleLogging.checked = response.loggingEnabled;
      });
    });
  });
});
