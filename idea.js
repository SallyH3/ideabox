class Idea {
  constructor(title, body, id, qualityIndex) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    // move back down to updateQuality after testing
    this.qualityArray = ['swill', 'plausible', 'genius'];
    this.qualityIndex = qualityIndex || 0; 
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
  // updateQuality(buttonClass) {
    // update quality needs access to quality array
    // this.qualityArray = ['swill', 'plausible', 'genius'];
  //   if(buttonClass.value === 'upvote-button') {
  //     this.qualityIndex++;
  //   } else if (buttonClass.value === 'downvote-button') {
  //     this.qualityIndex--;
  //   }
  //   this.saveToStorage();
  //   return this.qualityArray[this.qualityIndex];
  // }
}

