const displyContainer = document.querySelector('#monster-container')
const monsterForm = document.querySelector('#monster-form')
const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward')
const perPageBtn = document.querySelector('#per-page-dropdown')


let page = 1
let perPage = 5


function renderMonsters(monsters) {
    displyContainer.innerHTML = ""
    monsters.forEach(monster => {
        const monstDiv = document.createElement('div')
        const h2 = document.createElement('h2')
        const h4 = document.createElement('h4')
        const p = document.createElement('p')
        h2.textContent = monster.name
        h4.textContent = "Age: " + monster.age
        p.textContent = "Description: " + monster.description
        monstDiv.append(h2, h4, p)
        displyContainer.append(monstDiv)
    })
}

monsterForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const nameField = event.target.name.value
    const ageField = parseInt(event.target.age.value)
    const descriptionField = event.target.description.value

    const newMonster = {
        name: nameField,
        age: ageField,
        description: descriptionField
    }

    fetch('http://localhost:3000/monsters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMonster),
    })
        .then(response => response.json())
        .then(returnedMonster => {
            console.log('Success:', returnedMonster);
            renderMonsters(returnedMonster)
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    event.target.reset()
})

//Refactor these into one button with delegation maybe? This is fine though
backBtn.addEventListener('click', () => {
    page = page - 1
    fetchMonsters(perPage, page) 
})

forwardBtn.addEventListener('click', () => {
    page = page + 1
    fetchMonsters(perPage, page) 
})

perPageBtn.addEventListener('change', (event) => {
    perPage = parseInt(event.target.value)
    
    fetchMonsters(perPage, page)
})

function fetchMonsters(amount,page){
    console.log(amount)
    console.log(page)
    fetch(`http://localhost:3000/monsters/?_limit=${amount}&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
        renderMonsters(monsters)
    })
}

fetchMonsters(perPage,page)