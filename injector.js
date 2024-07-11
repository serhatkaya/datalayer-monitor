(function () {
  function waitForDataLayer() {
    if (window.dataLayer && !window.dmInitialized) {
      window.dmEnabled = true;
      const originalPush = window.dataLayer.push;

      window.dataLayer.push = function () {
        logEvent(arguments);
        return originalPush.apply(this, arguments);
      };

      window.dataLayer.forEach((item, index) => {
        console.log(
          `%c[DM] dataLayer[${index}] initialized with`,
          "color: blue; font-weight: bold;",
          item
        );
      });

      console.log(
        "%c[DM] dataLayer is initialized and being monitored.",
        "color: green; font-weight: bold;"
      );
      window.dmInitialized = true;
    } else {
      setTimeout(waitForDataLayer, 100);
    }
  }

  function logEvent(args) {
    if (!window.dmEnabled) {
      return;
    }
    const data = args[0];
    const { event } = data;
    if (event) {
      console.log(
        `%c[DM] %cGoogle ${Boolean(data.ecommerce) ? "🛒" : ""} - %c${event}`,
        "color: green; font-weight: bold;",
        "color: blue;",
        "color:green",
        data
      );
    } else {
      console.log(
        "%c[DM] %cUnknown",
        "color: green; font-weight: bold;",
        "color: gray;",
        data
      );
    }
  }

  function run() {
    waitForDataLayer();
  }

  run();
  window.addEventListener("message", (msg) => {
    if (msg.data.type && msg.data.type == "toggledm") {
      window.dmEnabled = msg.data.data;
    }
  });
})();

function setDmEnabled(state) {
  window.dmEnabled = state;
}
