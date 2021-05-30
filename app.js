const punkContainer = document.getElementById('punk')
const searchElement = document.getElementById('search')
const pageElement = document.getElementById('page')
const prevElement = document.getElementById('prev')
const nextElement = document.getElementById('next')
let beerName = ''
let perPage = 5
let page = 1
let nextEnabled = false

const removeChildren = (parent) => {
  while (parent.lastChild) {
      parent.removeChild(parent.lastChild)
  }
}

const updateButtonStates = () => {
  prevElement.disabled = (page === 1) ? true : false
  nextElement.disabled = nextEnabled ? false : true
}

const fetchPunk = () => {
  let url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage + 1}`
  if (beerName !== '') {
    url += `&beer_name=${beerName}`
  }

  fetch(url)
  .then(response => response.json())
  .then(responseData => {
    removeChildren(punkContainer)
    const childDiv = document.createElement('div')
    nextEnabled = responseData.length > perPage ? true : false
    if (nextEnabled) {
      responseData = responseData.slice(0, - 1)
    }
    responseData.forEach(item => {
      const img = document.createElement('img')
      img.src = item.image_url
      img.style.height = "100px"
      const nameDiv = document.createElement('div')
      nameDiv.innerHTML = item.name
      childDiv.appendChild(img)
      childDiv.appendChild(nameDiv)
    })
    punkContainer.appendChild(childDiv)

    pageElement.innerHTML = page
    updateButtonStates()
  })

}

const onSearchEventLisener = () => {
  beerName = searchElement.value
  fetchPunk()
}

const onNext = () => {
  page += 1
  fetchPunk()
}

const onPrev = () => {
  page -= 1
  fetchPunk()
}

searchElement.addEventListener('input', onSearchEventLisener)
prevElement.addEventListener('click', onPrev)
nextElement.addEventListener('click', onNext)
fetchPunk()
