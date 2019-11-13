import { API_KEY, IMAGE_URL } from './movies-api.js';
import { rating } from './movie-rating/movie-rating.js';

export const previewMovie = () => {
    let previewElement = document.querySelector(".quick-modal");
    document.querySelectorAll('.movie__card--image').forEach(item => {

        item.addEventListener('click', event => {
            let id = item.id;
            previewElement.setAttribute("style", "display:block");
            movieInfo(id);
        })
    })
}

const loadGenresName = (genres) => {
    let genresName = [];
    genres.forEach((ele, index) => {
        genresName.push(ele.name);
    })
    return genresName;
}

const loadCastNames = (cast) => {
    let castNames = [];
    cast.forEach((ele, index) => {
        castNames.push(ele.name)
    })
    return castNames;
}


const loadDirectorName = (crew) => {
    let directorName = '';
    crew.forEach(ele => {
        if (ele.job === "Director") {
            directorName = ele.name;
        }
    })
    return directorName;
}
const movieInfo = (id) => {
    let movie_id = id;
    const MOVIE_DATA = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
    fetch(MOVIE_DATA)
        .then(response => {
            return response.json()
        })
        .then(data => {
            quickView(data);
        })
        .catch(err => {
            console.log(err);
        })
}

const quickView = (movie) => {

    var movie_rating = rating(Math.floor(movie.vote_average / 2))
    var genres_name = loadGenresName(movie.genres);
    console.log(genres_name);
    var cast_name = loadCastNames(movie.credits.cast.slice(0, 5));
    var director_name = loadDirectorName(movie.credits.crew);

    var previewModal = document.querySelector("#quick-preview");

    //modal title
    var movieTitle = previewModal.querySelector(".quick-movie__title");
    movieTitle.textContent = movie.original_title ;

    //modal img
    var movieImg = previewModal.querySelector(".quick-movie__figure--img");
    movieImg.setAttribute("src", IMAGE_URL + movie.backdrop_path);
    movieImg.setAttribute("alt", movie.original_title);
    movieImg.setAttribute("title", movie.original_title);


    //modal description
    var movieSummary = previewModal.querySelector(".quick-movie__summary");
    movieSummary.textContent = movie.overview;

    //modal cast details

    var movieGenres = previewModal.querySelector(".quick-movie__list--genres");
    movieGenres.textContent = genres_name;

    var movieCast = previewModal.querySelector(".quick-movie__list--cast");
    movieCast.textContent = cast_name;

    var movieDirector = previewModal.querySelector(".quick-movie__list--director");
    movieDirector.textContent = director_name;

    var movieRating = previewModal.querySelector(".quick-movie__list--rating").innerHTML=movie_rating;

    var closeButton = document.querySelector(".quick-movie__close");
    closeButton.addEventListener("click", event => {
        document.querySelector(".quick-modal").setAttribute("style","display:none");
    })
}
