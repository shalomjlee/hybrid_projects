const API_URL= "https://pokeapi.co/api/v2/pokemon"

const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"

const FLAVOR_URL = "https://pokeapi.co/api/v2/pokemon-species/1"

const IMG_PATH = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"


const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3a145433fb23bddd05abd76c948de72&query8="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')



getDescription(FLAVOR_URL)

async function getDescription(url) {

    const res = await fetch(url)
    const data = await res.json()
    return showSummary(data.flavor_text_entries)
    // console.log(data.flavor_text)
}


function showSummary(pokemon_descr) {
    // console.log(pokemon_descr)
    // let index = 1

    for (const flavor of pokemon_descr) {
        // console.log(flavor.flavor_text)
        if (flavor.language.name ==="en") {

            // console.log(flavor.flavor_text)
            return flavor.flavor_text
        }
    }
}


getPokemons(API_URL)

async function getPokemons(url) {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    showPokemons(data.results)
}



getType(POKE_URL)

async function getType(url) {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    return data.types
}



async function showPokemons(pokemons) {

    let description = await getDescription(FLAVOR_URL)

    // console.log(pokemons)

    main.innerHTML = ''
    index = 0
    pokemons.forEach((pokemonData) => {
        index++
        let url = pokemonData.url
        let types = []
        let att = getType(url)
        .then((res) =>{
            // console.log(res);
            for (let i = 0; i < res.length; i++) {
                typeCast = res[i].type.name
                types.push(typeCast)
                // console.log(types)
            }
            return types
        })
        .catch((e) => console.log(e))
        
        const name = pokemonData.name
        const pokeEl = document.createElement('div')
        pokeEl.classList.add('pokemon')
        pokeEl.innerHTML = 
        `
        <img src="${IMG_PATH + parseInt(index) }.png" alt="${name}">
    
            <div class="movie-info">
                <h3 class="poke-name">${name} ${att[0]} </h3>
                <h2 class="poke-name">  </h2>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${types}    
            </div>
        `
        // console.log(types)
        main.appendChild(pokeEl)
        // console.log(main)
        // console.log(IMG_PATH + parseInt(index+1))
    })
}









//this is specifically for the search bar up top to find movies based on whats searched

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !=="") {
        getMovies(SEARCH_API + searchTerm)
        console.log(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})


function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}