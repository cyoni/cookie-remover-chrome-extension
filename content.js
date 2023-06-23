chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start") {
    sendResponse(window.location.href)
  }
})

chrome.runtime.sendMessage({
  method: "LOAD_ICON_BADGE",
  url: window.location.href,
})
