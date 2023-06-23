const removeCookiesButton = document.getElementById("remove-cookies")
const freeText = document.getElementById("free-text")
const list = document.getElementById("cookies")
let allCookies = []

const currentUrlResponse = (url) => {
  const subDomain = getSubDomainFromUrl(url)
  freeText.value = subDomain
  updateList(findCookies(subDomain, allCookies))
}

const updateList = (cookies) => {
  clearList()
  cookies.forEach((x) => {
    var newOption = document.createElement("option")
    newOption.value = x.name
    newOption.text = x.domain
    list.appendChild(newOption)
  })
  removeCookiesButton.innerHTML = `Remove Cookies (${cookies.length})`
}

const clearList = () => {
  var i,
    L = list.options.length - 1
  for (i = L; i >= 0; i--) {
    list.remove(i)
  }
}

const removeCookies = () => {
  const cookiesToRemove = findCookies(freeText.value, allCookies)
  cookiesToRemove.forEach((cookie) => {
    const prefix = "https://"
    const suffix =
      cookie.domain[0] === "." ? `${cookie.domain.substring(1)}` : cookie.domain
    const domain = `${prefix}${suffix}`
    console.log("removing", domain)
    chrome.cookies.remove({ name: cookie.name, url: domain })
  })
}

freeText.addEventListener("input", () => {
  updateList(findCookies(freeText.value, allCookies))
})

removeCookiesButton.addEventListener("click", async () => {
  removeCookies()

  // refresh the page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.update(tabs[0].id, { url: tabs[0].url })
  })

  // close popup
  window.close()
})

window.addEventListener("DOMContentLoaded", async (_) => {
  allCookies = await getAllCookies()

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(
      activeTab.id,
      { message: "start" },
      currentUrlResponse
    )
  })
})
