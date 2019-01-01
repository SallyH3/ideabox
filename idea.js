class Idea {
  constructor(title, body, id) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.qualityArray = ['swill', 'plausible', 'genius'];
    this.qualityIndex = 0; 
  }

  saveToStorage(cardArray) {
    localStorage.setItem('cardArray', JSON.stringify(cardArray));
  }

  updateContent(title, body, cardArray) {
    this.title = title;
    this.body = body;
    this.saveToStorage(cardArray);
  }

  deleteFromStorage(cardArray) {
    localStorage.setItem('cardArray', JSON.stringify(cardArray));
  }

  updateQuality(vote) {
    if (vote === 'upvote' && this.qualityIndex != [2]) {
      this.qualityIndex++; 
      this.saveToStorage(cardArray);
    }
    if (vote === 'downvote' && this.qualityIndex != [0]) {
      this.qualityIndex--;
      this.saveToStorage(cardArray);
    }
  }
}

