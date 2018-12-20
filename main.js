var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#live-search');
var cardArray = [];
var cardWrapper = document.querySelector('.card-wrapper');

//EVENT LISTENERS

cardWrapper.addEventListener('keyup', saveOnReturn);
searchInput.addEventListener('input', liveSearchFilter);
saveButton.addEventListener('click', createNewIdea);
window.addEventListener('load', persistCardsOnPageLoad);


function createNewIdea(e) {
  e.preventDefault();
  var ideaTitleInput = document.querySelector('#title-input').value;
  var ideaBodyInput = document.querySelector('#body-input').value;
  var ideaObject = new Idea(ideaTitleInput, ideaBodyInput);
  generateIdeaCard(ideaObject);
  cardArray.push(ideaObject);
  ideaObject.saveToStorage(cardArray);
  clearTextFields();
}

function saveOnReturn(e) {
  var cardTitle = e.target.closest('.card-title').innerText;
  var cardBody = e.target.closest('.card-body').innerText;
  var cardId = parseInt(e.target.closest('.card-container').getAttribute('id'));
  if(e.keyCode === 13) {
    console.log(cardTitle);
    cardArray.forEach(function (card){
      if(card.id === cardId) {
        card.updateContent(cardTitle, cardBody, cardArray);
      }
    })
  }
}

function clearTextFields() {
  var ideaTitleInput = document.querySelector('#title-input');
  var ideaBodyInput = document.querySelector('#body-input');
  ideaTitleInput.value = '';
  ideaBodyInput.value = '';
}

function removeAllCards() {
  cardWrapper.innerHTML = '';
}

//at the beginning of live search function, remove cards
function liveSearchFilter() {
  removeAllCards();
  //delete card function invoked here
  var searchCurrentText = searchInput.value;
  var filteredCards = cardArray.filter(function (idea) {
    return idea.title.includes(searchCurrentText) || idea.body.includes(searchCurrentText)
  });
  filteredCards.forEach(function(idea){
    generateIdeaCard(idea);
  })
  console.log(filteredCards)
  //filter checks for true/false boolean and returns
  //any objects that meet that function as true
  //checking .title and .body on each element in array
  // As a user types in the search box, the list of ideas should 
  //filter in real time to only display ideas whose title or body 
  //include the user’s text. The page should not reload.

}

function generateIdeaCard(ideaObject) {
  var card = document.createElement('section');
  card.className = 'idea-card';
  card.innerHTML = 
  `<article id=${ideaObject.id} class="card-container">
    <h2 contenteditable = true class="card-title">
    ${ideaObject.title}
    </h2>  
    <article contenteditable = true class="card-body">
    ${ideaObject.body}
    <hr>
    </article>
    <footer class="idea-card-footer">
      <section class="arrow-buttons-quality-container">
        <img class="downvote-button" src="downvote.svg">
        <img class="upvote-button" src="upvote.svg">
        Quality: ${ideaObject.qualityArray[ideaObject.qualityIndex]}
      </section>
      <section class="delete-button-container">
        <img class="delete-button" src="delete.svg">
      </section>
    </footer>
  </article>
  `
  cardWrapper.prepend(card);
}

function persistCardsOnPageLoad() {
  if(localStorage.hasOwnProperty('array')) {
    var getIdeas = localStorage.getItem('array');
    var parsedIdeas = JSON.parse(getIdeas);
    parsedIdeas.forEach(function(idea) {
      var ideaObject = new Idea(idea.title, idea.body, idea.id, idea.qualityIndex);
      cardArray.push(ideaObject);
      generateIdeaCard(ideaObject);
    });
  }
}