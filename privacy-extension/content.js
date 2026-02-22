const script = document.createElement("script");

script.src = chrome.runtime.getURL("inject.js");

script.onload = function () {
    console.log("Privacy Layer injected into page");
};

(document.documentElement).prepend(script);
