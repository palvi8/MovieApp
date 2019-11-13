import { movieData } from './movie-card.js';
import { previewMovie } from './movie-preview.js';
import { likedMovie } from './movie-rating/movie-rating.js'


const API_KEY = 'fba43c342279eb0dfa82ccbac547f06d';

const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

const LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`;

const TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const POPULAR_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

export class LoadMoviesAPI {

    fetchMoviesApi = (url, index) => {
        //fetching Latest, Trending and Popular API's 
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // template return to next row 
            document.getElementsByClassName('movie__list')[index].innerHTML = movieData(data);
            previewMovie();
            likedMovie();
        })
        .catch(err => {
                console.log(err);
        })
    }
}

var movieDetail = new LoadMoviesAPI();

movieDetail.fetchMoviesApi(LATEST_MOVIES, 0);
movieDetail.fetchMoviesApi(TRENDING_MOVIES, 1);
movieDetail.fetchMoviesApi(POPULAR_MOVIES, 2);

export { GENRES, IMAGE_URL, API_KEY }
