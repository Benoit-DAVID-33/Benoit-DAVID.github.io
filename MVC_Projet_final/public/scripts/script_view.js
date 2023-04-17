    ////////////////////////////////////////////////////////////////////////////////
    ///---------------- API index page--------------------//////////////////////////
    ////////////////////////////////////////////////////////////////////////////////


async function getMoviesInfo(container, movie){
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

getMovies('.moviesContainer1');
getMovies('.moviesContainer2', 'toprated'); 
getMovies('.moviesContainer3', 'upcoming');

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
    const liElementMovie4 = document.createElement('li');
    const h3ElementMovie = document.createElement('h3');
    const divElementMovie = document.createElement('div');
    
    const h3ContentMovie = document.createTextNode(movie.title);
    const liContentMovie2 = document.createTextNode('date de sortie :'+' '+ movie.release_date);
    const liContentMovie4 = document.createTextNode('Réalisateur :'+' '+ directors);
    
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

}

document.querySelectorAll('section[name=mc]').forEach(function(container){
	container.addEventListener('mouseover', function(event){
			
		container.querySelectorAll('.imgMovie').forEach(function(item){
			item.classList.add('ImgMoviePaused');
		});
		container.querySelectorAll('.imgMovieInverse').forEach(function(item){
			item.classList.add('ImgMoviePaused');
		});
	});
	container.addEventListener('mouseout', function(event){
		container.querySelectorAll('.imgMovie').forEach(function(item){
			item.classList.remove('ImgMoviePaused');
		});
		container.querySelectorAll('.imgMovieInverse').forEach(function(item){
			item.classList.remove('ImgMoviePaused');
		});
	});
});
	
	


	
	
	/*--------------------- popup ---------------------*/



	let playOne = true;

	window.addEventListener('scroll', () =>{
    	let scrollValue = 
        	(window.scrollY + window.innerHeight) / document.body.offsetHeight; 
	    // Popup
	    if (scrollValue > 0.75 && playOne) {
	        popup.style.opacity = 1;
	        popup.style.transform = "none";
	        playOne = false;
	    }
	});
	closeBtn2.addEventListener('click', () => {
	    popup.style.opacity = 0;
	    popup.style.transform = "translateX(500px)";
	});
