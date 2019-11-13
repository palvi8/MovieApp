import { API_KEY, IMAGE_URL } from '../movies-api.js';

const url = new URLSearchParams(window.location.search);
const ACTOR_ID = url.get("id");
console.log(ACTOR_ID);

const ACTOR_FILMOGRAPHY =  `https://api.themoviedb.org/3/person/${ACTOR_ID}/movie_credits?api_key=${API_KEY}&language=en-US`;

export const filmoGraphy = () => {
    fetch(ACTOR_FILMOGRAPHY)
    .then(response => {
        return response.json();
    })
    .then(data => {
            actorFilmography(data);
    })
    .catch(err => {
        console.log(err);
    })
}


let movie_panel = '';
let releaseDate = [];
let filmGraphy = [];

let showReleaseDate = [];
let showfilmDetail = [];
const actorFilmography = (data) => {
    data = data.cast;
    console.log(data);
    data.forEach(item => {
        let date = item.release_date;
        releaseDate.push(date.split("-")[0]);

        filmGraphy.push({
            release_date: item.release_date,
            character : item.character,
            title: item.title  
        })
    })

    console.log(filmGraphy);
    console.log(releaseDate);


var uniqueSet = new Set(releaseDate); // Set allow only unique values
console.log(uniqueSet);

var backToArray = [...uniqueSet]; //spread convert back to array
console.log(backToArray);

var sortDate = backToArray.sort(function(a,b){
    return b - a
})
    console.log("sortData"+sortDate);
    sortDate.forEach(item => {
        filmGraphy.forEach(ele =>{
            if(item == ele.release_date.split("-")[0]){
                showReleaseDate.push(item);
                showfilmDetail.push({

                    r_data: ele.release_date,
                    movie_char: ele.character,
                    movie_title: ele.title
                })
            }
        })
        console.log(showReleaseDate);
        console.log(showfilmDetail);
    })



}

