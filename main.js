function generateIdeaCard() {
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