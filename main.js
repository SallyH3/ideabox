var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#live-search');
var cardArray = [];
//perhaps change to ideaArrays or ideas because it is better semantically
var cardWrapper = document.querySelector('.card-wrapper');

//EVENT LISTENERS

cardWrapper.addEventListener('keyup', saveOnReturn);
// cardWrapper.addEventListener('click', deleteIdea);
searchInput.addEventListener('input', liveSearchFilter);
saveButton.addEventListener('click', createNewIdea);
window.addEventListener('load', persistCardsOnPageLoad);

//FUNCTIONS

function createNewIdea(e) {
  e.preventDefault();
  var ideaTitleInput = document.querySelector('#title-input').value;
  var ideaBodyInput = document.querySelector('#body-input').value;
  var ideaObject = new Idea(ideaTitleInput, ideaBodyInput);
  generateIdeaCard(ideaObject);
  cardArray.push(ideaObject);
  console.log(ideaObject)
  ideaObject.saveToStorage(cardArray);
  clearTextFields();
}

function saveOnReturn(e) {
  var cardTitle = e.target.closest('.card-container').firstChild.nextElementSibling.innerText;
  var cardBody = e.target.closest('.card-container').firstChild.nextElementSibling.nextElementSibling.innerText;
  var cardId = parseInt(e.target.closest('.card-container').getAttribute('id'));
  if(e.keyCode === 13) {
    cardArray.forEach(function (card){
      if(card.id === cardId) {
        card.updateContent(cardTitle, cardBody, cardArray);
      }
    })
  }
}

function deleteIdea(cardId) {
  // if (e.target.classList.contains('delete-button')) {
    // var ideaObject = new Idea(idea.title, idea.body, idea.id, idea.qualityIndex);
    // var cardId = parseInt(e.target.closest('.idea-card').dataset.id);
    console.log(cardId); 
    // console.log(cardArray[0].id)
    // var index = cardArray.id.indexOf(cardId);
    var card = cardArray.find(x => x.id == cardId);
    var index = cardArray.indexOf(x => x.id == cardId);
    cardArray.splice(index, 1);
    console.log(card);
    // card = JSON.parse(card)
    card.deleteFromStorage(card.id);
      // if(card.id === cardId){
    //     card.deleteFromStorage(card.id);
    //   }
    // })
      // console.log(id) 
      // ideaObject.id === id;
    // cardArray[index].deleteFromStorage();

    //look up toString function
    var deleteCard = document.getElementById(cardId.toString());
    deleteCard.remove();
    // e.target.closest('.idea-card').remove();
}
  //- Change function name from buttonEvents to RemoveCard
// …After we grab the classList contains ‘delete-button’, 
//we want to declare a new var called ideaObject and assign that to 
//e.target.closest(‘idea-card’).dataset.index(this gives us access to 
//the data attributes of the event we’re targeting both in HTML and 
//the DOM but, we’re going to be targeting the DOM in this case),
// Then we want to do our ideaObject.deleteFromStorage();
// Finally, we want to do e.target.closest(‘.idea-card’).remove();

function updateCardQuality() {
//function for upvote and downvote buttons
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
  });
  //filter checks for true/false boolean and returns
  //any objects that meet that function as true
  //checking .title and .body on each element in array
  // As a user types in the search box, the list of ideas should 
  //filter in real time to only display ideas whose title or body 
  //include the user’s text. The page should not reload.

}

// address footer make it a section
function generateIdeaCard(ideaObject) {
  var card = document.createElement('section');
  card.className = 'idea-card';
  // card.dataset.id = ideaObject.id;
  card.innerHTML = 
  `<section class="card-container" id="${ideaObject.id}">
    <h2 contenteditable = true class="card-title">
      ${ideaObject.title}
      </h2>  
    <article contenteditable = true class="card-body">
      ${ideaObject.body}
      <hr>
    </article>
    <article class="idea-card-footer">
      <section class="arrow-buttons-quality-container">
        <img class="downvote-button" src="downvote.svg">
        <img class="upvote-button" src="upvote.svg">
        Quality: ${ideaObject.qualityArray[ideaObject.qualityIndex]}
      </section>
      <section class="delete-button-container">
        <img class="delete-button" src="delete.svg" onclick="deleteIdea(${ideaObject.id})">
      </section>
    </article>
  </section>
  `
  cardWrapper.prepend(card);
}

// assign value with || or 
function persistCardsOnPageLoad() {
  if(localStorage.hasOwnProperty('cardArray')) {
    var getIdeas = localStorage.getItem('cardArray');
    var parsedIdeas = JSON.parse(getIdeas);
    parsedIdeas.forEach(function(idea) {
      var ideaObject = new Idea(idea.title, idea.body, idea.id, idea.qualityIndex);
      cardArray.push(ideaObject);
      generateIdeaCard(ideaObject);
    });
  }
}

// ----BASEMENT OF SANDBOX-------//

// function buttonEvents(e) {
//   if (e.target.classList.contains('delete-button')) {
//     var storageItem = localStorage.getItem('array');
//     var parsedItem = JSON.parse(storageItem);
//     parsedItem.forEach(function(idea) {
//     var ideaObject = new Idea(idea.title, idea.body, idea.id, idea.qualityIndex);
//     ideaObject.deleteFromStorage(ideaObject.id);
//     e.target.parentNode.parentNode.parentNode.remove();
//     });
//   }
// }
    // cardArray.forEach(function(ideaObject) {
    // cardArray.deleteFromStorage(ideaObject.id);
    //we dont need to grab from localStorage 
    // closest instead of parentNode



// target array on upvote and downvote buttons below 
//(in same function)...
//take out OR || logical operator and elseif and make into
//an if statement instead per FEM3 student's advice

  // else if (e.target.classList.contains('upvote-button') || e.target.classList.contains('downvote-button')) {
  //   var storageItem = localStorage.getItem('array');
  //   var parsedItem = JSON.parse(storageItem);
    // var ideaObject = new Idea JSON.parse(idea.title, idea.body, idea.id, idea.qualityIndex);
    // ideaObject.updateQuality(e.target.classList);
//   } else {
//     return 
//   }
// }

//deleteIdea notes from Julie:

  //we'll have to grab the card id
  //iterate through the card array
  //find the card with the same id 
  //as the one that was clicked on
  //using splice we will remove a specific 
  //card based on the index
  //update card array in local storage
  //we'll then call saveToStorage and pass 
  //in cardArray 






