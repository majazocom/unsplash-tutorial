const form = document.querySelector('form');
const searchQuery = document.querySelector('#query');
const imgList = document.querySelector('#images');
const baseUrl = 'https://api.unsplash.com/search/photos';
const key = '2vxPCj7GdSPSB7glv43N0IN9uiZ6Bp53Ht5wqaKiBPI';
let page = 1;

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchQuery.value)
    //kalla på funktionen som hämtar bilder från API'et
    getImages(searchQuery.value);
})

//här skriver vi funktionen där vi hämtar bilder från API'et
async function getImages(query) {
    const response = await fetch(baseUrl + `?query=${query}`, {
        headers: {
            'authorization': 'Client-ID ' + key
        }
    });
    const data = await response.json();
    console.log(data.results);
    //kalla på funktionen som renderar ut våra bilder så vi kan titta på dem
    renderImages(data.results);
}

//skriva funktionen för att rendera ut vår respons till gränssnittet
let renderImages = (images) => {
    images.forEach(image => {
        const imgListItem = document.createElement('li');
        imgListItem.innerHTML = `<img src="${image.urls.thumb}" alt="${image.alt_description}">`
        imgList.appendChild(imgListItem);
    })
}
