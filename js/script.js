//Leggere il readme.md che si trova nella cartella serverGames
document.addEventListener('DOMContentLoaded', function(){

const container = document.querySelector('.row')
const modalGenre = document.querySelector('.modal-genre')
const modalDeveloper = document.querySelector('.modal-developer')
const modalName = document.querySelector('.modal-name')
const modalPublisher = document.querySelector('.modal-publisher')
const modalSummary = document.querySelector('.modal-summary')
const modalImage = document.querySelector('.modal-img')
const modalRating = document.querySelector('.modal-rating')
const buttonClose = document.querySelectorAll('.modal-close')
const modal = document.querySelector('.modal')

class BackEndGame {
    constructor() {
        this.url = 'http://localhost:3001/games';
    }

    getGame() {
        fetch(this.url)
            .then(data => data.json())
            .then(data => printGame(data.result) )
    }
}

const printPage = new BackEndGame()
printPage.getGame()

const printGame = (data) => {
    data.forEach(element => {
        
        const template = `
         <div class="col mbd-5">
            <div class="card h-100">
            <img src="${element.image}" class="card-img-top" alt="${element.name}" />
            <div class="card-body d-flex flex-column justify-content-between">
                <h2 class="card-title fs-5">${element.name}</h2>
                <h3 class="fs-6">${element.publisher}</h3>

                <p class="card-text">${element.description}</p>
            
                <p class="card-details">
                <span class="badge text-bg-info">New</span>
                <span class="badge text-bg-light">${element.genre}</span>
                <span class="badge text-bg-light">${element.developer}</span>
                </p>
                <div class="btn btn-primary btn--view-more" data-id="${element.id}">View More details</div>
            </div>
           </div>
        </div>
        `
        container.innerHTML += template
    });

    const buttonView = this.querySelectorAll('.btn--view-more')
    buttonView.forEach(element => {
        element.addEventListener('click', function(){
          //prendo il data id del elemento genitore del viwe cliccato
          const id = this.getAttribute('data-id')
          getSingleRecipe(id)
        })
    })
}

const printPopUp = (result) => {
    
modal.classList.add('block')
modalImage.src = result.image;
modalGenre.innerHTML = result.genre;
modalDeveloper.innerHTML = result.developer;
modalName.innerHTML = result.name;
modalPublisher.innerHTML = result.publisher;
modalSummary.innerHTML = result.summary;
modalRating.innerHTML = result.rating;

if(result.rating == ('4.6') || result.rating == ('4.7') || result.rating == ('4.8') || result.rating == ('4.9') || result.rating == ('5')) {
    modalRating.innerHTML = '★★★★★'
} else {
    modalRating.innerHTML = '★★★★☆'
}

buttonClose.forEach(element => {
    element.addEventListener('click', function(){
        modal.classList.remove('block')
    })
})
}

const getSingleRecipe=(id)=>{
    fetch(`http://localhost:3001/games/${id}`)
        .then(response => response.json())
        .then(data => printPopUp(data.result)) //come risultato prendiamo la funzione che da il secondo template
        .catch(error => console.log('error', error));
  }

}); //end


