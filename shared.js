const findCookies = (text, allCookies) => {
  const filteredCookies = allCookies?.filter(({ domain }) =>
    domain.includes(text)
  )
  return filteredCookies || []
}

const getAllCookies = async () => {
  const res = await chrome.cookies.getAll({})
  return res
}

const getSubDomainFromUrl = (url) => {
  const regex = new RegExp(/(?:https?:\/\/)?(?:\w+\.)?(\w+\.\w+)/)
  return url.match(regex)[1]
}
