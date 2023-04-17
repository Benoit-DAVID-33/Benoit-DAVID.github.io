 
    ////////////////////////////////////////////////////////////////////////////////
    // ------------------- API movie page ------------------ ///////////////////////
    ////////////////////////////////////////////////////////////////////////////////


let url = new URL(window.location.href);
let idMovie = url.searchParams.get("id");

async function getMoviePageInfo(movieInfoPage){
    let promise4 = await fetch('https://api.themoviedb.org/3/movie/'+ idMovie +'/credits?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR');
    if(promise4.ok === true){
        let movieInfoPageCredit = await promise4.json();
        getMoviePageReview(movieInfoPage, movieInfoPageCredit)
        //showMoviePageInfo(movieInfoPage, movieInfoPageCredit);
        console.log(movieInfoPage, movieInfoPageCredit);
    }
}

async function getMoviePage( critere = '', tri = 'desc'){
    let url = ('https://api.themoviedb.org/3/movie/' + idMovie + '?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR');
    
    const promise3 = await fetch(url);
        if(promise3.ok === true){
            let movieInfoPage = await promise3.json();
                getMoviePageInfo(movieInfoPage);
        }else{
            alert('promise non ok');
        }
}

async function getMoviePageReview(movieInfoPage, movieInfoPageCredit){
    let promise5 = await fetch('https://api.themoviedb.org/3/movie/' + idMovie + '/videos?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR&page=1');
    if(promise5.ok === true){
        let moviePageVideo = await promise5.json();
        showMoviePageInfo(movieInfoPage, movieInfoPageCredit, moviePageVideo);
    }
}

getMoviePage();

async function showMoviePageInfo(movieInfoPage, movieInfoPageCredit, moviePageVideo){
    const movieContainerPage = document.querySelector('.movieContainer');
    const titleMoviePage = document.querySelector('#titleMoviePage');
    const videoContainerPage = document.querySelector('.videoContainer');
    
    let directors = '';
    let directorsImg = '';
    
    movieInfoPageCredit.crew.forEach((personne) => {
        if (personne.job == 'Director'){
            directors = personne.name;
            directorsImg = personne.profile_path;
        }
    });
    
    // div all /////////////////////////////////////////////////////////////////
        //contruction des 4 div remplis d'information sur le film 
        const movieContainer = document.createElement('article');
    
        const imgMovieElement = document.createElement('img');
        const divElementMoviePageAll = document.createElement('div');
        const divElementMoviePage1 = document.createElement('div');
        const divElementMoviePage2 = document.createElement('div');
        const divElementMoviePage3 = document.createElement('div');
        const divElementMoviePage4 = document.createElement('div');
        
        movieContainer.setAttribute('class', 'imgMoviePage');
        imgMovieElement.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + movieInfoPage.backdrop_path);
        imgMovieElement.setAttribute('alt', 'illustration' + movieInfoPage.title);
        imgMovieElement.setAttribute('id', 'moviePage'); 
        
        divElementMoviePageAll.setAttribute('class', 'containerDiv');
        divElementMoviePage1.setAttribute('class', 'spanDiv1' );
        divElementMoviePage2.setAttribute('class', 'spanDiv2');
        divElementMoviePage3.setAttribute('class', 'spanDiv3');
        divElementMoviePage4.setAttribute('class', 'spanDiv4');
        
        const h1ElementMovie = document.createElement('h1');
        const h1ContentMovie = document.createTextNode(movieInfoPage.title);
        
        movieContainerPage.appendChild(movieContainer);
        movieContainer.appendChild(imgMovieElement);
        h1ElementMovie.appendChild(h1ContentMovie);
        titleMoviePage.appendChild(h1ContentMovie);
        
        divElementMoviePageAll.appendChild(divElementMoviePage1);
        divElementMoviePageAll.appendChild(divElementMoviePage2);
        divElementMoviePageAll.appendChild(divElementMoviePage3);
        divElementMoviePageAll.appendChild(divElementMoviePage4);
        
        movieContainer.appendChild(divElementMoviePageAll);
    
    
    
    // div 1 ///////////////////////////////////////////////////////////////////
        
    
        const spanElementMovieDate = document.createElement('span');
        let valVote = parseInt(movieInfoPage.vote_average * 10) / 10;
        const spanContentMovieDate = document.createTextNode('note :'+' '+ valVote + ' / 10');
        spanElementMovieDate.appendChild(spanContentMovieDate);
        divElementMoviePage1.appendChild(spanElementMovieDate);
        
        const spanElementMovie1 = document.createElement('span');
        const spanContentMovie1 = document.createTextNode('date de sortie :'+' '+ movieInfoPage.release_date);
        spanElementMovie1.appendChild(spanContentMovie1);
        divElementMoviePage1.appendChild(spanElementMovie1);
        
        
        let nombreProduction = movieInfoPage.production_companies.length;
        nombreProduction = nombreProduction > 2 ? 2 : nombreProduction;
        for (let i = 0 ; i < nombreProduction; i++) {
            
            const divElementMovie = document.createElement('div');
            divElementMovie.setAttribute('class', 'divProd');
            
            const imgElementMoviePage = document.createElement('img');

            if(movieInfoPage.production_companies[i].logo_path == null){
                imgElementMoviePage.setAttribute('src', 'public/medias/clap-cinema.png');
            }else{
            imgElementMoviePage.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + movieInfoPage.production_companies[i].logo_path);
            }
            imgElementMoviePage.setAttribute('class', 'logoMovie1');
            imgElementMoviePage.setAttribute('alt', 'logo de ' + movieInfoPage.production_companies[i].name);
            divElementMovie.appendChild(imgElementMoviePage);
            divElementMoviePage1.appendChild(divElementMovie);
        
            const spanElementMovie = document.createElement('span');
            const spanContentMovie = document.createTextNode(movieInfoPage.production_companies[i].name);
            spanElementMovie.appendChild(spanContentMovie);
            divElementMoviePage1.appendChild(spanElementMovie);
        }
        const divElementMoviePageGenre = document.createElement('div');
            const divContentMoviePageGenre = document.createTextNode('Genres : ');
            divElementMoviePageGenre.appendChild(divContentMoviePageGenre);
            divElementMoviePage1.appendChild(divElementMoviePageGenre);
            
            let nombreGenre = movieInfoPage.genres.length;
            nombreGenre = nombreGenre > 3 ? 3 : nombreGenre;
            for (let i = 0; i < nombreGenre; i++){
                
                    const spanElementMovie5 = document.createElement('span');
                    const spanContentMovie5 = document.createTextNode(movieInfoPage.genres[i].name + (i < nombreGenre-1 ? ' / ' : '')); 
                    spanElementMovie5.appendChild(spanContentMovie5);
                    divElementMoviePageGenre.appendChild(spanElementMovie5);
            }
        
        
    // div 2 ///////////////////////////////////////////////////////////////////
    
    
        const divElementMoviePage5 = document.createElement('div');
        const h2ElementMoviePage1 = document.createElement('h2');
        const imgElementMoviePage1 = document.createElement('img');
        const spanElementMoviePage2 = document.createElement('span');
        const h2ElementMoviePage2 = document.createElement('h2');
        const divElementMPActor = document.createElement('div');
        
        const h2ContentMoviePage = document.createTextNode('Réalisateur :');
        const spanContentMoviePage2 = document.createTextNode(directors);
        const h2ContentMoviePage2 = document.createTextNode('Acteur :');
        
        divElementMoviePage5.setAttribute('class', 'divDirec');
        
        if(directorsImg == null){
            imgElementMoviePage1.setAttribute('src', 'public/medias/clap-cinema.png');
        }else{
            imgElementMoviePage1.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + directorsImg);
        }
        imgElementMoviePage1.setAttribute('class', 'imgCrew');
        divElementMPActor.setAttribute('class', 'divActor');
        
        let nombreActor = movieInfoPageCredit.cast.length;
        nombreActor = nombreActor > 8 ? 8 : nombreActor;
        for (let i = 0 ; i < nombreActor; i++) {
           
                const divElementMPActor2 = document.createElement('div');
                divElementMPActor2.setAttribute('class', 'divActor2');
                const imgElementMPActor = document.createElement('img');
                if(movieInfoPageCredit.cast[i].profile_path == null){
                    imgElementMPActor.setAttribute('src', 'public/medias/clap-cinema.png');
                }else{
                imgElementMPActor.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + movieInfoPageCredit.cast[i].profile_path);
                }
                imgElementMPActor.setAttribute('class', 'imgCrew');
                const spanElementMPActor = document.createElement('span');
                const spanContentMPActor = document.createTextNode(movieInfoPageCredit.cast[i].name);
               
                spanElementMPActor.appendChild(spanContentMPActor);
                divElementMPActor2.appendChild(imgElementMPActor);
                divElementMPActor2.appendChild(spanElementMPActor);
                divElementMPActor.appendChild(divElementMPActor2);
        }
        
        h2ElementMoviePage1.appendChild(h2ContentMoviePage);
        divElementMoviePage2.appendChild(h2ElementMoviePage1);
        divElementMoviePage5.appendChild(imgElementMoviePage1);
        spanElementMoviePage2.appendChild(spanContentMoviePage2);
        divElementMoviePage5.appendChild(spanContentMoviePage2);
        divElementMoviePage2.appendChild(divElementMoviePage5);
        h2ElementMoviePage2.appendChild(h2ContentMoviePage2);
        divElementMoviePage2.appendChild(h2ElementMoviePage2);
        divElementMoviePage2.appendChild(divElementMPActor);
        
        
    // div 3 ///////////////////////////////////////////////////////////////////
    
    
        const divElementMPStory = document.createElement('div');
        const h2ElementMPStory = document.createElement('h2');
        const h2ContentMPStory = document.createTextNode('Synopsis :');
        const pElementMPStory = document.createElement('p');
        const pContentMPStory = document.createTextNode(movieInfoPage.overview); 
        
        divElementMPStory.setAttribute('class', 'divStory');
        h2ElementMPStory.appendChild(h2ContentMPStory);
        divElementMPStory.appendChild(h2ElementMPStory);
        pElementMPStory.appendChild(pContentMPStory);
        divElementMPStory.appendChild(pElementMPStory);
        divElementMoviePage3.appendChild(divElementMPStory);
        
        
    // div 4 ///////////////////////////////////////////////////////////////
        
        
        const divElementMPBtn1 = document.createElement('div');
        const buttonElementMoviepage1 = document.createElement('button');
        const divElementMPBtn2 = document.createElement('div');
        const buttonElementMoviepage2 = document.createElement('button');
        const divElementMPBtn3 = document.createElement('div');
        const buttonElementMoviepage3 = document.createElement('button');
        
        const buttonContentMoviePage1 = document.createTextNode('Mettre dans les favoris');
        const buttonContentMoviepage2 = document.createTextNode('Film déjà vu');
        const buttonContentMoviePage3 = document.createTextNode('Film à voir');
        
        divElementMPBtn1.setAttribute('class', 'divBtn');
        buttonElementMoviepage1.setAttribute('class', 'btnMoviePage');
        buttonElementMoviepage1.setAttribute('id', 'btnMP1');
        buttonElementMoviepage1.setAttribute('title', 'Ajoutez à vos favoris');
        divElementMPBtn2.setAttribute('class', 'divBtn');
        buttonElementMoviepage2.setAttribute('class', 'btnMoviePage');
        buttonElementMoviepage2.setAttribute('id', 'btnMP2');
        buttonElementMoviepage2.setAttribute('title', 'Ajoutez aux films déjà vu');
        divElementMPBtn3.setAttribute('class', 'divBtn');
        buttonElementMoviepage3.setAttribute('class', 'btnMoviePage');
        buttonElementMoviepage3.setAttribute('id', 'btnMP3');
        buttonElementMoviepage3.setAttribute('title', 'Ajoutez aux films à voir');
        
        buttonElementMoviepage1.appendChild(buttonContentMoviePage1);
        buttonElementMoviepage2.appendChild(buttonContentMoviepage2);
        buttonElementMoviepage3.appendChild(buttonContentMoviePage3);
        
        
        divElementMPBtn1.appendChild(buttonElementMoviepage1);
        divElementMPBtn2.appendChild(buttonElementMoviepage2);
        divElementMPBtn3.appendChild(buttonElementMoviepage3);
        divElementMoviePage4.appendChild(divElementMPBtn1);
        divElementMoviePage4.appendChild(divElementMPBtn2);
        divElementMoviePage4.appendChild(divElementMPBtn3);
        
        
    ////////////////////////////////////////////////////////////////////////////
    ///------------------ btn movie page ------------------/////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    
        // Récupération du bouton et création d'une image pour l'icône du bouton
        const btn1 = document.getElementById('btnMP1');
        const imgMPBtn = document.createElement('img');
        
        // Ajout de l'attribut "src" et de la classe "imgBtn" à l'image du bouton
        imgMPBtn.setAttribute('src', 'public/medias/check-green.png');
        imgMPBtn.classList.add('imgBtn');
        
        // Ajout de l'image du bouton au div correspondant et appel de la fonction "checkFav" si l'ID de la personne est disponible
        divElementMPBtn1.appendChild(imgMPBtn);
        if(idPersonne) checkFav(imgMPBtn);
        
        // Ajout d'un événement de clic au bouton
        btn1.addEventListener('click', () => {
        
            // Vérification si l'ID de la personne est disponible
            if(idPersonne) {
                let url = '';
        
                // Si l'icône est visible, on envoie une requête pour supprimer le film des favoris, sinon on ajoute le film aux favoris
                if(imgMPBtn.classList.contains('imgBtnVisible')) {
                    url= 'index.php?page=api&action=deleteToFav';
                } else {
                    url= 'index.php?page=api&action=addToFav';
                }
        
                // Inversion de la visibilité de l'icône du bouton
                imgMPBtn.classList.toggle('imgBtnVisible');
        
                // Envoi d'une requête POST pour ajouter ou supprimer le film des favoris
                let myForm = new FormData();
                myForm.append('idFilm', idMovie);
                myForm.append('idPersonne', idPersonne);
                fetch (url, {
                    method: 'POST', 
                    body: myForm
                }).then(function(response){
                    response.json().then(function(data){
                        console.log(data);
                    });
                });
            } else {
                // Affichage d'une modal d'avertissement si l'ID de la personne n'est pas disponible
                modalWarning.style.display = "block";
        
                // Ajout d'un événement de clic pour fermer la modal
                const closeButton = document.querySelector(".closeWarning");
                closeButton.addEventListener("click", () => {
                    modalWarning.style.display = "none";
                });
            }
        });
        
        // Fonction pour vérifier si le film est dans les favoris de la personne et ajouter l'icône correspondante
        function checkFav(imageBouton){
            let url = 'index.php?page=api&action=checkToFav&idFilm=' + idMovie + '&idPersonne=' + idPersonne;
            fetch (url, {
                method: 'GET'
            }).then(function(response){
                response.json().then(function(data){
                    if (parseInt(data.inFav) == 1){
                        imageBouton.classList.add('imgBtnVisible');
                    }
                });
            });
        }

        
        const btn2 = document.getElementById('btnMP2');
         const imgMPBtn2 = document.createElement('img');
            imgMPBtn2.setAttribute('src', 'public/medias/eyes.png');
            imgMPBtn2.classList.add('imgBtn');
            divElementMPBtn2.appendChild(imgMPBtn2);
            if(idPersonne)checkSee(imgMPBtn2);
        
            btn2.addEventListener('click', () =>{
                if(idPersonne){
                let url = '';
                
                if(imgMPBtn2.classList.contains('imgBtnVisible')){
                    url= 'index.php?page=api&action=deleteToSee';
                }else{
                    url= 'index.php?page=api&action=addToSee';
                }
                
                imgMPBtn2.classList.toggle('imgBtnVisible');
                
                let myForm = new FormData();
                myForm.append('idFilm', idMovie);
                myForm.append('idPersonne', idPersonne);
                fetch (url, {
                    method: 'POST', 
                    body: myForm
                }).then(function(response){
                    response.json().then(function(data){
                        console.log(data);
                    });
                });
            }else{
                 modalWarning.style.display = "block";

                // Ajouter le code pour fermer la modal
                const closeButton = document.querySelector(".closeWarning");
                closeButton.addEventListener("click", () => {
                    modalWarning.style.display = "none";
                });
            }
        });
        
        function checkSee(imageBouton2){
            let url = 'index.php?page=api&action=checkToSee&idFilm=' + idMovie + '&idPersonne=' + idPersonne;
            fetch (url, {
                method: 'GET'
            }).then(function(response){
                response.json().then(function(data){
                    if (parseInt(data.inSee) == 1){
                        imageBouton2.classList.add('imgBtnVisible');
                    }
                });
            });
        }
        
        const btn3 = document.getElementById('btnMP3');
         const imgMPBtn3 = document.createElement('img');
            imgMPBtn3.setAttribute('src', 'public/medias/next.png');
            imgMPBtn3.classList.add('imgBtn');
            divElementMPBtn3.appendChild(imgMPBtn3);
            if(idPersonne)checkFutur(imgMPBtn3);
        
            btn3.addEventListener('click', () =>{
                if(idPersonne){
                let url = '';
                
                if(imgMPBtn3.classList.contains('imgBtnVisible')){
                    url= 'index.php?page=api&action=deleteToFutur';
                }else{
                    url= 'index.php?page=api&action=addToFutur';
                }
                
                imgMPBtn3.classList.toggle('imgBtnVisible');
                
                let myForm = new FormData();
                myForm.append('idFilm', idMovie);
                myForm.append('idPersonne', idPersonne);
                fetch (url, {
                    method: 'POST', 
                    body: myForm
                }).then(function(response){
                    response.json().then(function(data){
                        console.log(data);
                    });
                });
            }else{
                 modalWarning.style.display = "block";

                const closeButton = document.querySelector(".closeWarning");
                closeButton.addEventListener("click", () => {
                    modalWarning.style.display = "none";
                });
            }
                
        });
        
        function checkFutur(imageBouton3){
            let url = 'index.php?page=api&action=checkToFutur&idFilm=' + idMovie + '&idPersonne=' + idPersonne;
            fetch (url, {
                method: 'GET'
            }).then(function(response){
                response.json().then(function(data){
                    
                    if (parseInt(data.inFutur) == 1){
                        imageBouton3.classList.add('imgBtnVisible');
                    }
    
                });
            });
        }
 
 
    ////////////////////////////////////////////////////////////////////////////   
    ///------------------ video youtube ------------------//////////////////////
    ////////////////////////////////////////////////////////////////////////////
        
        
        const videoContainer = document.createElement('article');
        videoContainer.setAttribute('class', 'videoArt');
        const divElementVideo = document.createElement('iframe');
        divElementVideo.setAttribute('src', 'https://www.youtube.com/embed/' + moviePageVideo.results[0].key + '');
        divElementVideo.setAttribute('width', '560');
        divElementVideo.setAttribute('height', '315');
        divElementVideo.setAttribute('frameborder', '0');
        divElementVideo.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        divElementVideo.setAttribute('allowfullscreen','');
        divElementVideo.setAttribute('src', 'https://www.youtube.com/embed/' + moviePageVideo.results[0].key + '');
        divElementVideo.setAttribute('src', 'https://www.youtube.com/embed/' + moviePageVideo.results[0].key + '');
        
        videoContainer.appendChild(divElementVideo);
        videoContainerPage.appendChild(videoContainer);
    }
    
    
    ////////////////////////////////////////////////////////////////////////////
    ///------------ textarea modifier commentaire ----------////////////////////
    ////////////////////////////////////////////////////////////////////////////


const modifierCommentaireBtns = document.querySelectorAll('.modifier-commentaire');

modifierCommentaireBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const commentaireDiv = e.target.parentNode;
    const commentaireModificationDiv = commentaireDiv.nextElementSibling;

    commentaireDiv.style.display = 'none';
    commentaireModificationDiv.style.display = 'block';
  });
});


