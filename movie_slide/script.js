const body = document.body
const slides = document.querySelectorAll('.slide')
const slideContainer = document.getElementById('slider-container')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

const container = document.getElementById('container')

const arraySlides = Array.from(slides)

let activeSlide = 0


setBgtoBody()
function setBgtoBody() {
   body.style.backgroundImage = arraySlides[activeSlide].style.backgroundImage
}



function setActiveSlide() {
    arraySlides.forEach((slide) => {
        slide.classList.remove('active')
    })
    
    arraySlides[activeSlide].classList.add('active')
    console.log(arraySlides)
}

rightBtn.addEventListener('click', () => {
    activeSlide++
    console.log(activeSlide)
    if(activeSlide > arraySlides.length - 1) {
        activeSlide = 0
    }
        setBgtoBody()
        setActiveSlide()
    })
        
        
leftBtn.addEventListener('click', () => {
    activeSlide--
        
    if(activeSlide < 0) {
        activeSlide = arraySlides.length -1
        }
        setBgtoBody()
        setActiveSlide()
        })
        


const API_URL= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3a145433f8b23bddd05abd76c948de72&page=1"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"



const main = document.getElementById('main')
const form = document.getElementById('form')


getMovies(API_URL)


async function getMovies(url) {
    const res = await fetch(url)

    const data = await res.json()

    showMovies(data.results)
    
}

function showMovies(movies) {
    console.log(movies)
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div')
      
        // movieEl.classList.add('movie')
        movieEl.classList.add('slide')
        movieEl.classList.add('contain')
        movieEl.style.backgroundImage = `url('${IMG_PATH + poster_path}')`
        slideContainer.appendChild(movieEl)
        console.log(movieEl)
        arraySlides.push(movieEl)

    }
)}


const toggle = document.getElementById('toggle')

const nav = document.getElementById('nav')

toggle.addEventListener('click', () => {
    nav.classList.toggle('active')
})