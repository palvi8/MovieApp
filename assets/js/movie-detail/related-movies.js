import { API_KEY, IMAGE_URL } from '../movies-api.js';
import { rating, likedMovie } from '../movie-rating/movie-rating.js';
import { getGenres } from '../movie-genres/get-genres.js';



const current_url = new URLSearchParams(window.location.search);

let movie_id = current_url.get("id");

const SIMILAR_MOVIES = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`;

export const loadRelatedMovies = () => {
    fetch(SIMILAR_MOVIES)
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.querySelector('.movie__related').innerHTML = relatedMovies(data);
            likedMovie();
        })
        .catch(err =>{
            console.log(err);
        })
};

let relatedTemplate = '';
const relatedMovies = (movies) => {
    movies = movies.results;
    movies.forEach((movie, index) => {
        let m_rate = rating(Math.floor(movie.vote_average / 2));
        let genresName = getGenres(movie.genre_ids, index);
        if (index < 4) {
            relatedTemplate += `
            <div class="movie__card" id=${movie.id}>
					<figure>
						<img class="movie__card--image" src="${IMAGE_URL + movie.poster_path}">
					</figure>
					<div class="movie__card--body">
						<header class="movie__card--header">
							<h4 class="movie__card--title">${movie.title}</h4>
                                <span>
                                    ${(movie.popularity > 200) ? `<i class="fa fa-heart red" aria-hidden="true"></i>` : `<i class="fa fa-heart-o" aria-hidden="true"></i>`}
                                </span>
						</header>
						<summary class="movie__card--description">${genresName}</summary>
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
    return relatedTemplate;
}