import { api } from './variable.js';
import { card } from './movie-card.js';
import { preview } from './movie-preview.js';
import { general } from './general-functions/general-functions.js';

var newArray = {};     
export class LoadMoviesAPI {

    fetchMoviesApi = (url, index) => {
        //fetching Latest, Trending and Popular API's 
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // template return to next row 
            getGenres();
            card.movieData(data.results, index, 4);
            preview.previewMovie();
            general.likedMovie();

            Array.prototype.push.apply(newArray, data.results);
            localStorage.setItem('newArray', JSON.stringify(newArray)); 
        })
        .catch(err => {
                console.log(err);
        })
    }
}

var movieDetail = new LoadMoviesAPI();
movieDetail.fetchMoviesApi(api.LATEST_MOVIES(), 0);
movieDetail.fetchMoviesApi(api.TRENDING_MOVIES(), 1);
movieDetail.fetchMoviesApi(api.POPULAR_MOVIES(), 2);


export const getGenres = () => {
    fetch(api.GENRES())
        .then(response => {
            return response.json();
        })
        .then(genresData => {
            genresData = genresData.genres;
            localStorage.setItem('genresData', JSON.stringify(genresData));
            
        })
}

export const movieInfo = (id) => {
    let movie_id = id;
    fetch( api.MOVIE_DETAIL(movie_id) )
        .then(response => {
            return response.json()
        })
        .then(data => {
            preview.quickView(data);
        })
        .catch(err => {
            console.log(err);
        })
}


