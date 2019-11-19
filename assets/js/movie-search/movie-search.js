import { getGenres } from '../movie-genres/get-genres.js';
import { card } from '../movie-card.js';

var allResults = []

var retrievedData = localStorage.getItem("newArray");
var localMovies = JSON.parse(retrievedData);
const MovieArray = Object.keys(localMovies).map(i => localMovies[i])

const filteredArr = MovieArray.reduce((acc, current) => {
  const check = acc.find(item => item.id === current.id);
  if (!check) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);

let filterInput = document.querySelector('.search-filter__input');
 if(filterInput){
    filterInput.addEventListener('keyup', movieSearch);
 }
    let rangeInput = document.querySelector(".rating-filter__input");
      if(rangeInput){
        rangeInput.addEventListener('change', movieRating)
      }

function movieSearch(){
    let searchValue = event.target.value;
    let filterResult = filteredArr.filter((item) => {

      if(item.title || item.genre_ids){
        
        document.querySelector(".movie__list").innerHTML = '';
        let movieTitle = item.title.toLowerCase().includes(searchValue.toLowerCase());
        let movieGenre = getGenres.getGName(item.genre_ids).includes(searchValue.toLowerCase());
        return ( movieTitle || movieGenre ) 
      }

    });
    
    card.movieData(filterResult);
 };
 
function movieRating(){

    let rangeValue = event.target.value;
        let rangeResult = filteredArr.filter((item) => {
        let avg = Math.floor(item.vote_average/2);
        document.querySelector(".movie__list").innerHTML = " ";
        return avg.toString().includes(rangeValue.toString());
     })

     if( rangeResult.length == 0){
       document.querySelector(".movie__list").innerHTML = " ";
       document.querySelector(".not-found");
     }
     card.movieData(rangeResult);
}  

card.movieData(filteredArr);


