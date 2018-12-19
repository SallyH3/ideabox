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

  updateContent(text, type) {
    //if you're changing the title, 
    //change the title, if changing the body, change the body
    //so you can specify because it will need to be dynamic for what 
    //the user will enter
    if(type === 'title') {
      this.title = text;
    }
    if(type === 'body') {
      this.body = text;
    }
    this.saveToStorage();
  }
}

