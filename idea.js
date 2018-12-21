class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    // move back down to updateQuality after testing
    this.qualityArray = ['swill', 'plausible', 'genius'];
    this.qualityIndex = 0; 
  }

  saveToStorage(cardArray) {
    // var arrayJSON = JSON.stringify(cardArray);
    localStorage.setItem('cardArray', JSON.stringify(cardArray));
  }

  updateContent(title, body, cardArray) {
    this.title = title;
    this.body = body;
    this.saveToStorage(cardArray);
  }

  deleteFromStorage(id) {
    var getArray = localStorage.getItem('cardArray');
    var parseArray = JSON.parse(getArray);
    var backIntoStorage = parseArray.filter(function(idea) {
      if(idea.id != id) {
        return idea;
      }
    })
    localStorage.setItem('cardArray', JSON.stringify(backIntoStorage));
  }
  updateQuality(vote) {
    if (vote === 'upvote') {
      this.qualityIndex++
    }
    if (vote === 'downvote') {
      this.qualityIndex--
    }
    console.log(this.qualityIndex);
  }
}

