import { IMAGE_URL, api } from '../variable.js';
import { relatedMovies } from './related-movies.js';
import { general } from '../general-functions/general-functions.js';

const url = new URLSearchParams(window.location.search);
var movie_id = url.get("id");

(function () {
    fetch(api.MOVIE_DETAIL(movie_id))
        .then(response => {
            return response.json();
        })
        .then(data => {
            movieDetails(data);
        })
        .catch(err => {
            console.log(err);
        })
})();


export const movieDetails = (movie) => {
    
    console.log(movie);
    let movie_rating = general.loadRating(Math.floor(movie.vote_average / 2))
    let cast_name = general.loadCastName(movie.credits.cast);
    let director_name = general.loadDirectorName(movie.credits.crew)
    let genres_name = general.loadGenresName(movie.genres);

    var movieBanner = document.querySelector(".movie-detail__banner--image");
    movieBanner.setAttribute("src",IMAGE_URL + movie.backdrop_path);
    movieBanner.setAttribute("alt",movie.original_title);
    movieBanner.setAttribute("title",movie.original_title);

    document.querySelector(".movie-detail__heading").textContent = movie.original_title;
    document.querySelector(".movie-detail__summary").textContent = movie.overview;
    document.querySelector(".genres").textContent = genres_name;
    document.querySelector(".cast").innerHTML = cast_name;
    document.querySelector(".director").textContent = director_name;
    document.querySelector(".rating").innerHTML = movie_rating;  
}

relatedMovies.loadRelatedMovies();

