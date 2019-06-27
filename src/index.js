console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
  fetchDogs()
  fetchBreeds()
})

function fetchDogs() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then( dogsData => dogsData.json())
    .then( dogsJson => renderDogs(dogsJson))
};

function fetchBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then( breedData => breedData.json())
    .then( breedJson => renderBreed(breedJson))
};

function renderDogs(dogsJson) {

  const dogsArray = dogsJson.message

  for (const dog of dogsArray) {
    const div = document.querySelector('#dog-image-container')
    const img = document.createElement('img')
    img.src = dog
    div.appendChild(img)
  }
};

function renderBreed(breedJson){

  const breedObject = breedJson.message

  for (const breed in breedObject) {
    const ul = document.querySelector('#dog-breeds')
    const li = document.createElement('li')
    li.innerHTML = `<li>${breed}</li>`
    changeColor(li)
    ul.appendChild(li)
  }
  selectbreed(breedObject)
};


function changeColor (li){
  li.addEventListener('click', event => {
    li.style.color = 'red'
  })
};




function selectbreed(breedObject){
  document.querySelector('#breed-dropdown').addEventListener('change', event => {
    console.log(event)
    let letter = event.target.value
    renderBreedBySelection(letter, breedObject)
  })
};


function renderBreedBySelection (letter, breedObject){
  deleteOldLi()

  const breeds = {...breedObject}
  const breedsNames = Object.keys(breeds)

  for (const breed of breedsNames) {

    if ( breed.charAt(0) === letter) {
      const ul = document.querySelector('#dog-breeds')
      const li = document.createElement('li')
      li.innerHTML = `<li>${breed}</li>`
      changeColor(li)
      ul.appendChild(li)
    };
  };
};

function deleteOldLi () {
  const old = Array.prototype.slice.call(document.querySelectorAll("li"));
    for ( let i = 0; i < old.length; i++) {
      old[i].remove()
    };
}
