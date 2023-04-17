    ////////////////////////////////////////////////////////////////////////////////
    ///------------------ menu burger --------------------//////////////////////////
    ////////////////////////////////////////////////////////////////////////////////


const sidebar = document.getElementById('side-bar');
const content = document.querySelector(".content");
const btn = document.querySelector("#btn");

btn.addEventListener('click', () =>{
    sidebar.classList.toggle('active');
});

content.addEventListener('click', ()=>{
    sidebar.classList.remove('active');
});


    ////////////////////////////////////////////////////////////////////////////////
    ///------------------ modal connexion ---------------///////////////////////////
    ////////////////////////////////////////////////////////////////////////////////


if (document.getElementById("loginModal")){
    

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");

const closeBtn = loginModal.querySelector(".close");

loginBtn.addEventListener("click", function() {
  loginModal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
  loginModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
});

const btnFC = document.getElementById("firstConnexion");
    btnFC.addEventListener('click', ()=> {
    window.location.href = 'index.php?page=contact&action=add';
    });

}


    ////////////////////////////////////////////////////////////////////////////////
    /// ----------------- Modal contact ----------------------//////////////////////
    ////////////////////////////////////////////////////////////////////////////////



const contact = document.getElementById("btnModalContact");
const contactModal = document.getElementById("contactModal");

const closeBtn = contactModal.querySelector(".close");

contact.addEventListener("click", function() {
  contactModal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
  contactModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == contactModal) {
    contactModal.style.display = "none";
  }
});


    ////////////////////////////////////////////////////////////////////////////
    ///------------------ recherche ------------------//////////////////////////
    ////////////////////////////////////////////////////////////////////////////



var searchInput = document.getElementById("search");
var resultsList = document.getElementById("resultsList");

// Fonction qui interroge l'API et affiche les résultats dans la liste

function handleSearch(event) {
  var query = searchInput.value;
  window.location.href="index.php?page=search&action=execute&q=" + query;
}
searchInput.addEventListener("change", handleSearch);



    ////////////////////////////////////////////////////////////////////////////////
    ///---------------- API index page--------------------//////////////////////////
    ////////////////////////////////////////////////////////////////////////////////



/*async function getMoviesInfo(container, movie){
    let promise2 = await fetch('https://api.themoviedb.org/3/movie/'+movie.id+'/credits?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR');
    if(promise2.ok === true){
        let movieInfo = await promise2.json();
        showMovies(movie, movieInfo, container);
    }
}



async function getMovies(container, critere = '', tri = 'desc'){
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR&sort_by=popularity.${tri}&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&w=480&h=620`;
    if (critere != ''){
        if (critere == 'toprated'){
            url = `https://api.themoviedb.org/3/movie/top_rated?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR&sort_by=popularity.${tri}&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`;
        }
        if (critere == 'upcoming'){
            url = `https://api.themoviedb.org/3/movie/upcoming?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR&sort_by=popularity.${tri}&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`;
        }
         //if (critere == 'reviews'){
           //  url = ('https://api.themoviedb.org/3/movie/'+movie.id+'/reviews?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR&sort_by=popularity.${tri}&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=1');
         //}
    }
    
    const promise = await fetch(url);
        if(promise.ok === true){
            let movies = await promise.json();
            movies.results.forEach((movie)=>{
                getMoviesInfo(container, movie);
            });
            
        }else{
            alert('promise non ok');
        }
    }

// getMovies('.moviesContainer1');
// getMovies('.moviesContainer2', 'toprated'); 
// getMovies('.moviesContainer3', 'upcoming');
// getMovies('.moviesContainer4', 'reviews');
//console.log(getMovieInfo());




function getColor(note){
    retVal = '#000000';
    if (note >= 0 && note < 45){
        retVal = 'red';
    }else if (note >= 45 && note < 75){
        retVal = 'yellow';
    }else{
        retVal = 'green';
    }
    return retVal;
}



async function showMovies(movie, movieInfo, container){
    const moviesContainer = document.querySelector(container);
    
    
    let directors = '';
    movieInfo.crew.forEach((personne) => {
        if (personne.job == 'Director'){
            directors += personne.name + ', ';
        }
    });
    directors = directors.substr(0, directors.length - 2);
    
    let producers = '';
    movieInfo.crew.forEach((personne2) => {
        if (personne2.job == 'Producer'){
            producers += personne2.name + ', ';
        }
    });
    producers= producers.substr(0, producers.length - 2);
    
    
    const movieContainer = document.createElement('article');
    const aMovieElement = document.createElement('a');
    const imgMovieElement = document.createElement('img');
    const ulElementMovie = document.createElement('ul');
    const liElementMovie1 = document.createElement('li');
    const liElementMovie2 = document.createElement('li');
    //const liElementMovie3 = document.createElement('li');
    const liElementMovie4 = document.createElement('li');
    const h3ElementMovie = document.createElement('h3');
    const divElementMovie = document.createElement('div');
    
    const h3ContentMovie = document.createTextNode(movie.title);
    const liContentMovie2 = document.createTextNode('date de sortie :'+' '+ movie.release_date);
    //const liContentMovie3 = document.createTextNode('note :'+' '+ movie.vote_average);
    const liContentMovie4 = document.createTextNode('Réalisateur :'+' '+ directors);
    //const divContentMovie = document.createTextNode(movie.vote_average);
    
    aMovieElement.setAttribute('class', 'linkMovie');
    aMovieElement.setAttribute('href', 'index.php?page=movie&action=view&id=' + movie.id);
    movieContainer.setAttribute('class', (container == '.moviesContainer2' ? 'imgMovieInverse' : 'imgMovie'));
    imgMovieElement.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + movie.poster_path);
    imgMovieElement.setAttribute('alt', "illustration d'un film");
    imgMovieElement.setAttribute('id', 'movie'); 
    
    ulElementMovie.setAttribute('id', 'movieList');
    
    
    
    divElementMovie.setAttribute('role', 'progressbar');
    divElementMovie.setAttribute('aria-valuenow', + (movie.vote_average * 10));
    divElementMovie.setAttribute('aria-valuemin', 0);
    divElementMovie.setAttribute('aria-valuemax', 100); 
    divElementMovie.setAttribute('style', '--value:' + (movie.vote_average *10) + ';--fg:'+getColor(movie.vote_average * 10)+';');
    
    moviesContainer.appendChild(movieContainer);
    movieContainer.appendChild(imgMovieElement);
    movieContainer.appendChild(aMovieElement);
    
    h3ElementMovie.appendChild(h3ContentMovie);
    liElementMovie1.appendChild(h3ContentMovie);
    
    ulElementMovie.appendChild(liElementMovie1);
    aMovieElement.appendChild(ulElementMovie);
    
    liElementMovie2.appendChild(liContentMovie2);
    ulElementMovie.appendChild(liElementMovie2);
    
    liElementMovie4.appendChild(liContentMovie4);
    ulElementMovie.appendChild(liElementMovie4);
    
    movieContainer.appendChild(divElementMovie);

}*/

    
    ////////////////////////////////////////////////////////////////////////////////
    // ------------------- API movie page ------------------ ///////////////////////
    ////////////////////////////////////////////////////////////////////////////////


/*let url = new URL(window.location.href);
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
            //console.log(movieInfoPage);
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
    //directors = directors.substr(0, directors.length - 2);
    // console.log(directors);
    
    
    // div all /////////////////////////////////////////////////////////////////
    
    
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
            //console.log(nombreActor);
           
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
    
    
        const btn1 = document.getElementById('btnMP1');
        const imgMPBtn = document.createElement('img');
            imgMPBtn.setAttribute('src', 'public/medias/check-green.png');
            imgMPBtn.classList.add('imgBtn');
            divElementMPBtn1.appendChild(imgMPBtn);
            if(idPersonne)checkFav(imgMPBtn);
        
            btn1.addEventListener('click', () =>{
                if(idPersonne){
                    
                
                let url = '';
                
                if(imgMPBtn.classList.contains('imgBtnVisible')){
                    url= 'index.php?page=api&action=deleteToFav';
                }else{
                    url= 'index.php?page=api&action=addToFav';
                }
                
                        
                imgMPBtn.classList.toggle('imgBtnVisible');
            // idMovie
                
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

                // Ajouter le code pour fermer la modal
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
        
    }*/
    
    ////////////////////////////////////////////////////////////////////////////
    ///------------------ Page User view ------------------/////////////////////
    ////////////////////////////////////////////////////////////////////////////
    

  /* async function getUserInfo(idFilm) {
    let url = 'https://api.themoviedb.org/3/movie/' + idFilm + '?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR';
    const promise = await fetch(url);
    if (promise.ok === true) {
      let userInfoPage = await promise.json();
      getMoviePageInfo(userInfoPage);
      return userInfoPage;
    } else {
      alert('Promise non ok');
    }
  }

  function createUserContent(userInfo, containerClass) {
    const userContainer = document.querySelector(containerClass);
    const userFavContainer = document.createElement('article');
    userFavContainer.setAttribute('class', 'favContainer');
    const aUserElement = document.createElement('a');
    aUserElement.setAttribute('class', 'linkMovie');
    aUserElement.setAttribute('href', 'index.php?page=movie&action=view&id=' + userInfo.id);
    
    const userImg = document.createElement('img');
    userImg.setAttribute('class', 'userImg');
    userImg.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + userInfo.poster_path);
    const userTitle = document.createTextNode(userInfo.title);
    aUserElement.appendChild(userImg);
    aUserElement.appendChild(userTitle);
    userFavContainer.appendChild(aUserElement);
    userContainer.appendChild(userFavContainer);
  }
*/




    ////////////////////////////////////////////////////////////////////////////
    ///------------ textarea modifier commentaire ----------////////////////////
    ////////////////////////////////////////////////////////////////////////////


/*const modifierCommentaireBtns = document.querySelectorAll('.modifier-commentaire');

modifierCommentaireBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const commentaireDiv = e.target.parentNode;
    const commentaireModificationDiv = commentaireDiv.nextElementSibling;

    commentaireDiv.style.display = 'none';
    commentaireModificationDiv.style.display = 'block';
  });
});
*/




