importScripts("./shared.js")

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const { method, url } = request
  switch (method) {
    case "LOAD_ICON_BADGE":
      const allCookies = await getAllCookies()
      const subDomain = getSubDomainFromUrl(url)
      const filteredCookies = findCookies(subDomain, allCookies)
      const amount = filteredCookies.length
      const text = amount > 100 ? "100+" : String(amount)
      chrome.action.setBadgeText({ text })
      chrome.action.setBadgeBackgroundColor({ color: "#fb8500" })

      break
  }
})


chrome.tabs.onActivated.addListener(
  ()=>{
    console.log("updated")
  }
)
