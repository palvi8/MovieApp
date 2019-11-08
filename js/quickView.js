
import { API_KEY, IMAGE_URL } from './api.js';
import { rating } from './rating.js';

export let quick = () => {
    let qView = document.querySelector(".quick-modal");
    document.querySelectorAll('.movie__card--image').forEach(item => {
        item.addEventListener('click', event => {
            let id = item.id;
            qView.setAttribute("style", "display:block");
            quickInfo(id);
        })
        document.querySelector(".quick-modal").addEventListener("click", event => { document.querySelector(".quick-modal").setAttribute("style", "display:none") })
    })
}

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

let quickInfo = (id) => {
    let movie_id = id;
    const MOVIE_DATA = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
    fetch(MOVIE_DATA)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            document.querySelector(".quick-modal").innerHTML = quickView(data);
        })
}

let quickView = (movie) => {
    let popup = '';
    let movie_rating = rating(Math.floor(movie.vote_average / 2))
    let genres_name = getName(movie.genres);
    let cast_name = getCast(movie.credits.cast.slice(0, 5));
    let director_name = directName(movie.credits.crew)
    popup = `
                <div class="quick-movie">
                <header class="quick-movie__header">
                <h2 class="quick-movie__title">${movie.original_title}</h2>
                <span class="quick-movie__close">&times;</span>
            </header>
            <div class="quick-movie__detail">
                <figure class="quick-movie__figure">
                    <img class="quick-movie__figure--img"src="${IMAGE_URL + movie.backdrop_path}">
                </figure>
                <summary>${movie.overview}</summary>
            </div>
            <ul class="quick-movie__list">
                <li class="quick-movie__list--item">
                    <h4>Genre:</h4> <span>${genres_name}</span></li>
                <li class="quick-movie__list--item">
                    <h4>Cast:</h4> <span>${cast_name}</span></li>
                <li class="quick-movie__list--item">
                    <h4>Director:</h4> <span>${director_name}</span></li>
                <li class="quick-movie__list--item">
                    <h4>Rating:</h4>
                    <span>${movie_rating}</span>
                </li>
            </ul>
            </div>
  `
    return popup;
}
