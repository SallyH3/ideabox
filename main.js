var saveButton = document.querySelector('#save-button');

saveButton.addEventListener('click', createNewIdea);

function createNewIdea(e) {
  e.preventDefault();
  var ideaTitleInput = document.querySelector('#title-input').value;
  var ideaBodyInput = document.querySelector('#body-input').value;
  var ideaObject = new Idea(ideaTitleInput, ideaBodyInput);
  ideaObject.saveToStorage();
  generateIdeaCard(ideaObject);
}

function generateIdeaCard(ideaObject) {
  var card = document.createElement('section');
  var cardContainer = document.querySelector('.card-container');
  card.className = 'idea-card';
  card.innerHTML = 
  `<article id=${ideaObject.id} class="card-container">
    <h2 contenteditable = true class="card-title">
    ${ideaObject.title}
    </h2>  
    <article contenteditable = true class="card-body">
    ${ideaObject.body}
    </article>
    <hr>
    <footer class="idea-card-footer">
      <img class="downvote-button" <i> >
      <img class="upvote-button" <i> >
      Quality: ${ideaObject.qualityArray[ideaObject.qualityIndex]}
      <img class="delete-button" <i> >
    </footer>
  </article>
  `
  cardContainer.prepend(card);
}