import { GENRES } from './api.js';

export let getGenres = (gId, index) => {
    fetch(GENRES)
        .then(response => {
            return response.json();
        })
        .then(genresData => {
            //console.log(genresData);
            genresData = genresData.genres;
            document.querySelectorAll('.movie__card--description')[index].innerHTML = getGenresName(genresData, gId)
        })
}

let getGenresName = (data, ids) => {
    let genresNames = [];
    data.forEach(elements => {
        //console.log(elements);
        ids.forEach(id => {
            //console.log(id);
            if (id == elements.id) {
                genresNames.push(elements.name)
            }
        })
    })
    //console.log(genresNames);
    return genresNames;
}
