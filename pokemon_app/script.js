const API_URL= "https://pokeapi.co/api/v2/pokemon?limit=151"
const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"
const FLAVOR_URL = "https://pokeapi.co/api/v2/pokemon-species/"
const IMG_PATH = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3a145433fb23bddd05abd76c948de72&query8="'


const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')



// getDescription(FLAVOR_URL)

async function getDescription(url) {

    const res = await fetch(url)
    const data = await res.json()
    return showSummary(data.flavor_text_entries)
    // console.log(data.flavor_text)
}

function showSummary(pokemon_descr) {
    for (const flavor of pokemon_descr) {
        if (flavor.language.name ==="en") {
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

    
    // console.log(pokemons)
    
    main.innerHTML = ''
    let index = 0
    await pokemons.forEach((pokemonData) => {
        index++
        let description = getDescription(FLAVOR_URL + parseInt(index)).then((res)=>{return res})
        // console.log(description)
        let url = pokemonData.url
        
        let types = []
        console.log(types)
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
        const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
        const pokeEl = document.createElement('div')
        pokeEl.classList.add('pokemon')
        // console.log(index)
        pokeEl.setAttribute('id', index)

        //  let over = document.getElementById(index).addEventListener('mouseover', function(event) {
        //      alert(event.touches.length);
        //  }, false)

        console.log(pokeEl)

        pokeEl.classList.add('image')

        let pokeImage = document.createElement('img')
        pokeImage.srcset=`${IMG_PATH + parseInt(index) }.png`


        let typeClass = document.createElement('h3');
        typeClass.classList.add('poke-name')
        typeClass.innerText = `${capitalName}`
        
        // console.log(typeClass)
        pokeEl.append(pokeImage)
        pokeEl.append(typeClass)
        
        pokeOverview = document.createElement('div')

        pokeOverview.classList.add('overview')
        pokeOverview.innerHTML = `
        <h3>Overview </h3>
        <h4> ${description}
        
        `
        pokeEl.append(pokeOverview)



        // pokeEl.innerHTML = 
        // `
       
    
        //     <div class="pokemon-info">
        //         <h3 class="poke-name">${name} ${types} </h3>
        //         <h2 class="poke-name">  </h2>
        //     </div>
        //     <div class="overview">
        //         <h3>Overview</h3>
        //         ${types}    
        //     </div>
        // `
        // console.log(types)
        main.appendChild(pokeEl)

    })
}



function hoverHandler(e) {
    if(e.type == 'mouseover') {
        alert('you hovered')
    }
}

//this is specifically for the search bar up top to find movies based on whats searched

// form.addEventListener('submit', (event) => {
//     event.preventDefault()

//     const searchTerm = search.value

//     if(searchTerm && searchTerm !=="") {
//         getMovies(SEARCH_API + searchTerm)
//         console.log(SEARCH_API + searchTerm)
//         search.value = ''
//     } else {
//         window.location.reload()
//     }
// })


// function getClassByRate(vote) {
//     if(vote >= 8) {
//         return 'green'
//     } else if (vote >= 5) {
//         return 'orange'
//     } else {
//         return 'red'
//     }
// }