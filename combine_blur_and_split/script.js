


//section contains third party API calls with jokes
const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')

jokeBtn.addEventListener('click', generateDadJoke)

generateDadJoke()

async function generateDadJoke() {
    const config = {
        
        headers: {
            Accept: 'application/json'
        },
}

    const res = await fetch('https://icanhazdadjoke.com', config)

    const data = await res.json()

    jokeEl.innerHTML = data.joke
}


const chuckEl = document.getElementById('chuck')
const chuckBtn = document.getElementById('chuckBtn')
chuckBtn.addEventListener('click', generateChuckJoke)

generateChuckJoke()

async function generateChuckJoke() {

    const res = await fetch('https://api.chucknorris.io/jokes/random')

    const data = await res.json()

    chuckEl.innerHTML = data.value
}


//section calls javascript interaction with style divs
const left = document.querySelector(".left")
const right = document.querySelector(".right")
const container = document.querySelector(".container")


left.addEventListener('mouseenter', () => {
    intRight = setInterval(blurRight, 1) 
    container.classList.add('hover-left')
})

left.addEventListener('mouseleave', () => {
    container.classList.remove('hover-left')
    removeBlur()
})

right.addEventListener('mouseenter', () => {
    container.classList.add('hover-right')
    intLeft = setInterval(blurLeft, 1) 

})

right.addEventListener('mouseleave', () => {
    container.classList.remove('hover-right')
    removeBlur()
})


//section pertains to blurring and removing blur as well

let intRight = 0
let intLeft = 0
let loadRight = 0
let loadLeft = 0

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function blurRight() {
    loadRight++
    if (loadRight > 99) {
        clearInterval(intRight)
    }
    document.querySelector(".split.right").style.opacity = scale(loadRight, 0, 100, 1, 0.1)
    
}

function blurLeft() {
    // loadRight = 0
    loadLeft++
    
    if (loadLeft > 99) {
        clearInterval(intLeft)
    }
    document.querySelector(".split.left").style.opacity = scale(loadLeft, 0, 100, 1, 0.1)
    
}

const removeBlur = () => {
    document.querySelector(".split.right").style.opacity = 100
    document.querySelector(".split.left").style.opacity = 100
    intRight = 0
    intLeft = 0
}