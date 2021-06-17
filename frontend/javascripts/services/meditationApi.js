class MeditationApi {
    static persistAudio(blob, title) {
        return new Promise((resolve, reject) => {
            
                    const data = new File([blob], "meditation_file")
                    const formData = new FormData()
                    formData.append("audio", data)
                    formData.append("title", title)
                    
                fetch("http://localhost:3000/meditations", {
                                method: 'POST',
                                body: formData
                            })
                            .then(resp => resp.json())
                            .then(json => {

                            new Meditation(json)
                            
                            resolve("persisted")
                        
                    })
                })
        }

    static deleteMeditation(i) {
        
        
        return fetch(`http://localhost:3000/meditations/${i["id"]}`, {
                    method: 'DELETE'
                })
    }

    
    static grabMeditations() {
            return new Promise((resolve, reject) => {
                    resolve(fetch("http://localhost:3000/meditations")
                    .then(resp => resp.json())
                    .then(json => {
                        
                            Meditation.appendAllToPage(json)
                    }
                ))
            })
        }       

}