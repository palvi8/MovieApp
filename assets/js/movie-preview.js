import { IMAGE_URL } from './variable.js';
import { movieInfo } from './movies-api.js';
import { general } from './general-functions/general-functions.js';

export var preview = {
    previewMovie: () => {
        let previewElement = document.querySelector(".quick-modal");
        document.querySelectorAll('.movie__card--image').forEach(item => {

            item.addEventListener('click', event => {
                let id = item.id;
                previewElement.setAttribute("style", "display:block");
                movieInfo(id);
            })
        })
    },

    quickView: (movie) => {

        var movie_rating = general.loadRating(Math.floor(movie.vote_average / 2))
        var genres_name = general.loadGenresName(movie.genres);
        //console.log(genres_name);
        var cast_name = general.loadCastName(movie.credits.cast.slice(0, 5));
        var director_name = general.loadDirectorName(movie.credits.crew);

        var previewModal = document.querySelector("#quick-preview");
        //modal title
        previewModal.querySelector(".quick-movie__title").textContent = movie.original_title;
        //modal img
        var movieImg = previewModal.querySelector(".quick-movie__figure--img");
        movieImg.setAttribute("src", IMAGE_URL + movie.backdrop_path);
        movieImg.setAttribute("alt", movie.original_title);
        movieImg.setAttribute("title", movie.original_title);

        //modal description
        previewModal.querySelector(".quick-movie__summary").textContent = movie.overview;
        //modal cast details
        previewModal.querySelector(".quick-movie__list--genres").textContent = genres_name;
        previewModal.querySelector(".quick-movie__list--cast").innerHTML = cast_name;
        previewModal.querySelector(".quick-movie__list--director").textContent = director_name;
        previewModal.querySelector(".quick-movie__list--rating").innerHTML = movie_rating;

        var closeButton = document.querySelector(".quick-movie__close");
        closeButton.addEventListener("click", event => {
            document.querySelector(".quick-modal").setAttribute("style", "display:none");
        })
    }

}



