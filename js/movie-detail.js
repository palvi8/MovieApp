import { API_KEY, IMAGE_URL } from './api.js';
import { rating } from './rating.js';
import { relatedApi } from './related-movies.js';

const url = new URLSearchParams(window.location.search);
let movie_id = url.get("id");

const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;

(function () {
    fetch(MOVIE_DETAIL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.querySelector('.current-movie').innerHTML = movieDetails(data);
        })
})();

let getName = (genres) => {
    let genresName = [];
    genres.forEach((ele, index) => {
        genresName.push(ele.name);
    })
    return genresName;
}

let getCast = (cast) => {
    let castNames = [];
    cast.forEach((ele, index) => {
        castNames.push(ele.name)
    })
    return castNames;
}


let directName = (crew) => {
    let dname = '';
    crew.forEach(ele => {
        if (ele.job === "Director") {
            console.log(ele.name)
            dname = ele.name;
        }
    })
    return dname;
}

let detail_template = '';
let movieDetails = (movie) => {
    //console.log(movie);
    let movie_rating = rating(Math.floor(movie.vote_average / 2))
    let genres_name = getName(movie.genres);
    let cast_name = getCast(movie.credits.cast.slice(0, 5));
    let director_name = directName(movie.credits.crew)

    detail_template = `
        <section class="movie-detail__banner" style="background-image:url(${IMAGE_URL + movie.backdrop_path})"></section>
			<section class="movie-detail container">
				<article class="movie-detail__description">
					<h2 class="heading">${movie.original_title}</h2>
					<summary class="movie-detail__summary">
						${movie.overview}
					</summary>
				</article>
				<article class="movie-detail__categories">
					<ul class="category__list">
						<li class="category__item">
							<h4 class="category__item--heading">Genre</h4>
							<span class="category__item--detail">${genres_name}</span>
						</li>
						<li class="category__item">
							<h4 class="category__item--heading">Cast</h4>
							<span class="category__item--detail">${cast_name}</span>
						</li>
						<li class="category__item">
							<h4 class="category__item--heading">Director</h4>
							<span class="category__item--detail">${director_name}</span>
						</li>
						<li class="category__item">
							<h4 class="category__item--heading">Rating</h4>
							<span class="category__item--detail">${movie_rating}</span>
						</li>
					</ul>
				</article>
			</section>
    `
    return detail_template;
}

relatedApi();

