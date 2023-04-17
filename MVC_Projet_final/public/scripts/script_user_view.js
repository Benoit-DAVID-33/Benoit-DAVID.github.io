    ////////////////////////////////////////////////////////////////////////////
    ///------------------ Page User view ------------------/////////////////////
    ////////////////////////////////////////////////////////////////////////////
    

   async function getUserInfo(idFilm) {
    let url = 'https://api.themoviedb.org/3/movie/' + idFilm + '?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR';
    const promise = await fetch(url);
    if (promise.ok === true) {
      let userInfoPage = await promise.json();
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


   