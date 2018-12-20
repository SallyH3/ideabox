class Idea {
  constructor(title, body, id, qualityIndex) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.qualityArray = ['swill', 'plausible', 'genius'];
    //wrap brain around qualityIndex
    this.qualityIndex = qualityIndex || 0; 
  }

  saveToStorage(cardArray) {
    var arrayJSON = JSON.stringify(cardArray);
    localStorage.setItem('array', arrayJSON);
  }

  updateContent(title, body, cardArray) {
    this.title = title;
    this.body = body;
    this.saveToStorage(cardArray);
  }
  deleteFromStorage(id) {
    localStorage.removeItem(id);
  }
  updateQuality(buttonClass) {
    if(buttonClass.value === 'upvote-button') {
      this.qualityIndex++;
    } else if (buttonClass.value === 'downvote-button') {
      this.qualityIndex--;
    }
    this.saveToStorage();
    return this.qualityArray[this.qualityIndex];
  }
}

