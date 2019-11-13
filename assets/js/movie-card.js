import { rating } from './movie-rating/movie-rating.js';
import { getGenres } from './movie-genres/get-genres.js';
import { IMAGE_URL } from './movies-api.js';

export const movieData = (data,idx) => {
    var cardTemplate = '';
    var movies = data.results;

    movies.forEach((movie, index) => {        
        var genresName = getGenres(movie.genre_ids, index); 
        var movieRating = rating(Math.floor(movie.vote_average / 2));
        if(index < 4 ){
            cardTemplate += `
            <div class="movie__card" id=${movie.id}>
                <figure> 
                    <img id=${movie.id} class="movie__card--image" src="${IMAGE_URL + movie.poster_path}">
                </figure>
                <div class="movie__card--body">
                    <header class="movie__card--header">
                        <h4 class="movie__card--title">${movie.title}</h4>
                        <span class="movie__card--like"><i class="fa fa-heart-o"></i></span>
                    </header>
                    <summary class="movie__card--description">${genresName} </summary>
                    <footer class="movie__card--footer">
                        <span class="movie_rating">
                            ${movieRating}
                        </span>
                        <a class="movie__card--view" href="movie-detail.html?id=${movie.id}">Show more</a>
                    </footer>
                </div>
            </div>
        `
        }
    })

    return cardTemplate;

}

