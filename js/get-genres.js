import { GENRES } from './api.js';

export const getGenres = (gId, index) => {
    fetch(GENRES)
        .then(response => {
            return response.json();
        })
        .then(genresData => {
            genresData = genresData.genres;
            document.querySelectorAll('.movie__card--description')[index].innerHTML = getGenresName(genresData, gId)
        })
}

const getGenresName = (data, ids) => {
    let genresNames = [];
    data.forEach(elements => {
        ids.forEach(id => {
            if (id == elements.id) {
                genresNames.push(elements.name)
            }
        })
    })
    return genresNames;
}
