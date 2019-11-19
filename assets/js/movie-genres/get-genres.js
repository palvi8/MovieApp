

var retrieveGenres = localStorage.getItem("genresData");
var localGenres = JSON.parse(retrieveGenres);

export var  getGenres = {
    getGName : (genID) => {
    let gNames = [];
    localGenres.forEach(item => {
        if (genID) {
            genID.forEach(ids => {
                if (ids == item.id) {
                    gNames.push(item.name.toLowerCase());

                }
            })
        }

    })
    return gNames;
}
}
