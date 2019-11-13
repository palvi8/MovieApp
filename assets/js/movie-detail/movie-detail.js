import { API_KEY, IMAGE_URL } from '../movies-api.js';
import { rating } from '../movie-rating/movie-rating.js';
import { loadRelatedMovies } from '../movie-detail/related-movies.js';


const url = new URLSearchParams(window.location.search);
var movie_id = url.get("id");
const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;

(function () {
    fetch(MOVIE_DETAIL)
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

const loadGenresName = (genres) => {
    let genresName = [];
    genres.forEach((ele, index) => {
        genresName.push(ele.name);
    })
    return genresName;
}

const loadCastName = (cast) => {
    let castDetails = [];
    let template = [];
    cast.forEach((ele, index) => {
        castDetails.push({id:ele.id, name:ele.name})
    })
    castDetails.forEach(castData => {
        template.push(`<a class="category__item--detail" href="actor-detail.html?id=${castData.id}">${castData.name}</a>`) 
    })
    return template;
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

export const movieDetails = (movie) => {
    
    console.log(movie);
    let movie_rating = rating(Math.floor(movie.vote_average / 2))
    let cast_name = loadCastName(movie.credits.cast);
    let director_name = loadDirectorName(movie.credits.crew)
    let genres_name = loadGenresName(movie.genres);

    var movieBanner = document.querySelector(".movie-detail__banner--image");
    movieBanner.setAttribute("src",IMAGE_URL + movie.backdrop_path);
    movieBanner.setAttribute("alt",movie.original_title);
    movieBanner.setAttribute("title",movie.original_title);

    var movieName = document.querySelector(".movie-detail__heading");
    movieName.textContent = movie.original_title;

    var movieOverview = document.querySelector(".movie-detail__summary");
    movieOverview.textContent = movie.overview;

    var movieGenres = document.querySelector(".genres");
    movieGenres.textContent = genres_name;

    var movieCast = document.querySelector(".cast").innerHTML = cast_name;
    
    var movieDirector = document.querySelector(".director");
    movieDirector.textContent = director_name;
    
    var movieRating = document.querySelector(".rating").innerHTML = movie_rating;  
}

loadRelatedMovies();

