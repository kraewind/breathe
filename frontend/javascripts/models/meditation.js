class Meditation {
   static all = []

   constructor({id, audio, title, comments}) {
      this.id = id
        this.audio = audio
        this.title = title
        this.comments = comments
        Meditation.all.push(this)
    }

   render() {
     let med_id = this.id
    const clipContainer = document.createElement('article');
    const clipLabel = document.createElement('p');
    const audio = document.createElement('audio');
    const deleteButton = document.createElement('button');
    const commentDiv = document.createElement('div')
    const ul = document.createElement('ul')
    const commentBox = document.createElement("textarea")
    const br = document.createElement('br')
    const submitCommentButton = document.createElement(['button'])

    clipContainer.classList.add('clip');
    audio.setAttribute('controls', '');
    deleteButton.innerHTML = "Delete Meditation";
    submitCommentButton.innerHTML = "Submit Comment"

    clipLabel.innerHTML = this.title;
    audio.src = "http://localhost:3000" + this.audio
    commentDiv.appendChild(ul)
    clipContainer.id = this.id
    
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(audio);
    clipContainer.appendChild(commentDiv)
    clipContainer.appendChild(commentBox)
    clipContainer.appendChild(submitCommentButton)
    
    clipContainer.appendChild(br)
    clipContainer.appendChild(deleteButton);
    soundClips().appendChild(clipContainer);
    
    if(this.comments){
      this.comments.forEach(comment => {
        let c = new Comment(comment)
        c.render()
      })
  }
      deleteButton.onclick = function(e) {
        
        let evtTgt = e.target;
        
        MeditationApi.deleteMeditation(med_id)
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      }


      submitCommentButton.onclick = function(e) {
        let commentText = e.target.parentNode.querySelector("textArea").value
        CommentApi.handleSubmit(commentText, e.target.parentNode.id)
      }
   }

   static findOrCreateBy(meditationObj) {
      return this.findByName(meditationObj.name) || new Meditation(meditationObj)
  }

  static appendAllToPage(audi) {
    
    for (const key in audi) {
          let medi = new this({
                id: key,
                audio: audi[key]["url"],
                title: audi[key]["title"],
                comments: audi[key]["comments"]
              })
              
            medi.render()  
    }

  }



  static filterByKeyWord() {
    let passedThrough = Meditation.all.filter(meditation => meditation.title === searchBar().value)
    art().innerHTML = ''

    if(passedThrough != []) {
    passedThrough.forEach(meditation => {
      meditation.render()
    })}

  }
 
}