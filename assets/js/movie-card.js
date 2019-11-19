import { general } from './general-functions/general-functions.js';
import { IMAGE_URL } from './variable.js';
import { getGenres } from './movie-genres/get-genres.js';

export var card = {
    movieData : (data, idx = 0, items) => {
    let movieCard = document.getElementById("movie-card");
    let movieList = document.querySelectorAll('.movie__list')[idx];
    let movie = data.slice(0, items);

    movie.forEach((movie, index) => {
        if (movie.id) {

            var genresName = getGenres.getGName(movie.genre_ids);
            var movieRating = general.loadRating(Math.floor(movie.vote_average / 2));
            var clone = document.importNode(movieCard.content, true);

            var cardImage = clone.querySelector(".movie__card--image");
            cardImage.setAttribute("id", movie.id);
            cardImage.setAttribute("src", IMAGE_URL + movie.poster_path);
            cardImage.setAttribute("alt", movie.title);
            cardImage.setAttribute("title", movie.title);

            clone.querySelector(".movie__card--title").textContent = movie.title;
            clone.querySelector(".movie__card--description").textContent = genresName;
            clone.querySelector(".movie_rating").innerHTML = movieRating;
            clone.querySelector(".movie__card--view").setAttribute("href", `movie-detail.html?id=${movie.id}`);

            movieList.appendChild(clone);
        }

    })

}
}



