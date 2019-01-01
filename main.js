//GLOBAL VARIABLES

var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#live-search');
var cardArray = [];
var cardWrapper = document.querySelector('.card-wrapper');
var showMoreLessButton = document.querySelector('#show-more-less-button');

//EVENT LISTENERS

cardWrapper.addEventListener('keyup', saveOnReturn);
searchInput.addEventListener('input', liveSearchFilter);
saveButton.addEventListener('click', createNewIdea);
window.addEventListener('load', persistCardsOnPageLoad);
showMoreLessButton.addEventListener('click', recentIdeas);
document.querySelector('.genius').addEventListener('click', filterIdeasByGenius);
document.querySelector('.plausible').addEventListener('click', filterIdeasByPlausible);
document.querySelector('.swill').addEventListener('click', filterIdeasBySwill);

//FUNCTIONS

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

function recentIdeas() {
  if(showMoreLessButton.innerText === 'Show Less') {
    cardWrapper.style.height = '1880px';
    cardWrapper.style.overflow = 'hidden';
    showMoreLessButton.innerText = 'Show More';
} else {
    showMoreLessButton.innerText = 'Show Less';
    cardWrapper.style.overflow = 'visible';
  }
}

function saveOnReturn(e) {
  var cardTitle = e.target.closest('.card-container').firstChild.nextElementSibling.innerText;
  var cardBody = e.target.closest('.card-container').firstChild.nextElementSibling.nextElementSibling.innerText;
  var cardId = parseInt(e.target.closest('.card-container').getAttribute('id'));
  if(e.keyCode === 13) {
    cardArray.forEach(function (card) {
      if(card.id === cardId) {
        card.updateContent(cardTitle, cardBody, cardArray);
      }
    });
  }
}

function generateIdeaCard(ideaObject) {
  var card = document.createElement('section');
  card.className = 'idea-card';
  card.innerHTML = 
  `<section class='card-container' id='${ideaObject.id}'>
    <h2 contenteditable = true class='card-title'>
      ${ideaObject.title}
    </h2>  
    <article contenteditable = true class='card-body'>
      ${ideaObject.body}
    </article>
    <article class='idea-card-footer'>
      <section class='arrow-buttons-quality-container'>
        <img class='downvote-button' src='downvote.svg' onclick='updateIdeaQuality(event, "downvote")'>
        <img class='upvote-button' src='upvote.svg' onclick='updateIdeaQuality(event, "upvote")'>
        <span class='quality-category'>
        Quality: 
        ${ideaObject.qualityArray[ideaObject.qualityIndex]}
        </span>
      </section>
      <section class='delete-button-container'>
        <img class='delete-button' src='delete.svg' onclick='deleteIdea(${ideaObject.id})'>
      </section>
    </article>
  </section>
  `
  cardWrapper.prepend(card);
}

function filterIdeasBySwill(e) {
  e.preventDefault();
  removeAllCards();
  var swillCards = cardArray.filter(function(idea) {
    return idea.qualityIndex === 0;
  });
  swillCards.forEach(function(idea) {
  generateIdeaCard(idea);
  });
}

function filterIdeasByPlausible(e) {
  e.preventDefault();
  removeAllCards();
  var plausibleCards = cardArray.filter(function(idea) {
    return idea.qualityIndex === 1;
  });
  plausibleCards.forEach(function(idea) {
    generateIdeaCard(idea);
  });
}

function filterIdeasByGenius(e) {
  e.preventDefault();
  removeAllCards();
  var geniusCards = cardArray.filter(function(idea) {
    return idea.qualityIndex === 2;
  });
  geniusCards.forEach(function(idea) {
    generateIdeaCard(idea);
  });
}

function deleteIdea(cardId) {
  var card = cardArray.find(function(card) {
    return card.id === cardId
  });
  var index = cardArray.indexOf(card);
  cardArray.splice(index, 1);
  card.deleteFromStorage(cardArray);
  var deleteCard = document.getElementById(cardId.toString());
  deleteCard.closest('.idea-card').remove();
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

function liveSearchFilter() {
  removeAllCards();
  var searchCurrentText = searchInput.value;
  var filteredCards = cardArray.filter(function (idea) {
    return idea.title.includes(searchCurrentText) || idea.body.includes(searchCurrentText)
  });
  filteredCards.forEach(function(idea) {
    generateIdeaCard(idea);
  });
}

function updateIdeaQuality(event, vote) {
  var cardIdentifier = parseInt(event.target.closest('.card-container').getAttribute('id'));
  var card = cardArray.find(function(card) {
    return card.id === cardIdentifier
    });
  card.updateQuality(vote);
  var cardContainerElement = document.getElementById(cardIdentifier);
  var cardQualityFooterElement = cardContainerElement.children[2];
  var cardArrrowButtons = cardQualityFooterElement.children[0];
  var cardQualityText = cardArrrowButtons.children[2];
  cardQualityText.innerText = `Quality: ${card.qualityArray[card.qualityIndex]}`;
}