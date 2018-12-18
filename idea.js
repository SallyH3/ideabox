class Idea {
  constructor(title, body, id, qualityIndex) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.qualityArray = ['swill', 'plausible', 'genius'];
    //wrap brain around qualityIndex
    this.qualityIndex = qualityIndex || 0; 
  }

  saveToStorage() {
    var stringifyIdea = JSON.stringify(this);
    localStorage.setItem(this.id, stringifyIdea);
  }
}

