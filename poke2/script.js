const poke_container = document.getElementById('poke-container')
const pokemon_count = 151
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()


//live serach filter

const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []





getData()

filter.addEventListener('input', (e) => filterData(e.target.value))



async function getData() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')

    const { results } = await res.json()
    
    // Clear result
    result.innerHTML = ''
    index = 0
    results.forEach(pokemon => {
        index++
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
        const li = document.createElement('li') 
        const url = `https://pokeapi.co/api/v2/pokemon/${index}`
        listItems.push(li)

        li.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png"" alt="${name}">
            <div class="user-info">
            <div class="info">
            <span class="number">#${index}</span>
            <h3>${name}</h3>
            </div>
        `

        result.appendChild(li)
    })
}






function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}





//nav bar


const toggle = document.getElementById('toggle')

const nav = document.getElementById('nav')

toggle.addEventListener('click', () => {
    nav.classList.toggle('active')
})




const pokeToggle = document.getElementById('pokeToggle')

const pokedex = document.getElementById('pokedex')

pokeToggle.addEventListener('click', () => {
    pokedex.classList.toggle('active')
})

// function myFunction() {
//     var x = document.getElementById("result");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }