import { api } from '../variable.js';
import { card } from '../movie-card.js';
import { general } from '../general-functions/general-functions.js';

const current_url = new URLSearchParams(window.location.search);
let movie_id = current_url.get("id");

export var relatedMovies = {
    loadRelatedMovies : () => {
    fetch(api.SIMILAR_MOVIES(movie_id))
        .then(response => {
            return response.json();
        })
        .then(data => {
            card.movieData(data.results,0,4);
            general.likedMovie();
        })
        .catch(err =>{
            console.log(err);
        })
}
}

