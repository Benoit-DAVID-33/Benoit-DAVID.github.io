// Cette fonction prend en paramètre une requête de recherche et une page de résultats.
function search(query, numPage = 1) {
    // On construit l'URL de l'API en utilisant la requête et la page de résultats.
    var url = "https://api.themoviedb.org/3/search/movie?api_key=cd803c879e3d5f1960cf6b4e26b31279&language=fr-FR&page=" + numPage + "&include_adult=false&query=" + query;
 
    // On utilise la méthode fetch pour envoyer une requête GET à l'API.
    fetch(url)
        .then(function(response) {
          // Si la réponse est correcte (statut 200), on transforme le résultat en objet JSON.
          if (response.ok) {
            return response.json();
          }
          // Sinon, on lève une exception avec un message d'erreur.
          throw new Error("Une erreur s'est produite. Veuillez réessayer plus tard.");
        })
        // Une fois la réponse transformée en objet JSON, on traite les données.
        .then(function(data) {
    
            // Pour chaque résultat, on crée un élément HTML contenant le titre et l'affiche du film.
            data.results.forEach(function(result) {
              if (result.title.toUpperCase().indexOf(query.toUpperCase()) >= 0){ 
                  if(result.poster_path != null){
                let div = document.createElement('div');
                let aSearchElement = document.createElement('a');
                aSearchElement.setAttribute('class', 'linkSearch');
                aSearchElement.setAttribute('href', 'index.php?page=movie&action=view&id=' + result.id);
                let img = document.createElement('img');
                let h3 = document.createElement("h3");
                div.setAttribute('class', 'divMovieSearch');
                img.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + result.poster_path);
                img.setAttribute('class', 'imgMovieSearch');
                h3.textContent = result.title;
        
                aSearchElement.appendChild(img);
                aSearchElement.appendChild(h3);
                div.appendChild(aSearchElement);
                resultsList.appendChild(div);
                  }
              }
          });
        })
        // Si une erreur survient, on affiche un message d'erreur.
        .catch(function(error) {
          resultsList.innerHTML = "<li>" + error.message + "</li>";
        });
    }

// On récupère la requête de recherche dans l'URL de la page.
let url = new URL(window.location.href);
let query = url.searchParams.get("q");

// On lance la recherche pour les 5 premières pages de résultats.
for (let i = 0 ; i < 5; i++) {
    search(query, i+1);
}
