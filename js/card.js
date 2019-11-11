import { rating } from './rating.js';
import { getGenres } from './get-genres.js';
import { IMAGE_URL } from './api.js';

let movieData = (data,idx) => {
    let template = '';
    let movies = data.results;

    movies.map((movie, index) => {
        let m_rate = rating(Math.floor(movie.vote_average / 2));
        let genresName = getGenres(movie.genre_ids, index);        
        if (index < 4) {
            template += `
            <div class="movie__card" id=${movie.id}>
                        <figure class="chkk"> 
                            <img id=${movie.id} class="movie__card--image" src="${IMAGE_URL + movie.poster_path}">
                        </figure>
                        <div class="movie__card--body">
                            <header class="movie__card--header">
                                <h4 class="movie__card--title">${movie.title}</h4>
                                <span>
                                    ${(movie.popularity > 200) ? `<i class="fa fa-heart red" aria-hidden="true"></i>` : `<i class="fa fa-heart-o" aria-hidden="true"></i>`}
                                </span>
                            </header>
                            <summary class="movie__card--description">${genresName} </summary>
                            <footer class="movie__card--footer">
                                <span class="movie_rating">
                                   
                                    ${m_rate}
                                </span>
                                <a class="movie__card--view" href="movie-detail.html?id=${movie.id}">Show more</a>
                            </footer>
                        </div>
                    </div>
        `
        }
    })
    return template;
}

export { movieData }