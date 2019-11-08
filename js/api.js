import { movieData } from './card.js';

export const API_KEY = 'fba43c342279eb0dfa82ccbac547f06d';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

const LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`;

const TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const POPULAR_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;



const fetchAll = (url, index) => {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.getElementsByClassName('movie__list')[index].innerHTML = movieData(data);
        })
}


fetchAll(LATEST_MOVIES, 0);
fetchAll(TRENDING_MOVIES, 1);
fetchAll(POPULAR_MOVIES, 2);

export { GENRES, IMAGE_URL }

