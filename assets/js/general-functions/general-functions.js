var general = {

    loadRating: (rating) => {
        let ratingResult = ''
        for (let i = 1; i <= 5; i++) {
            ratingResult = `${ratingResult} <i class= "fa ${rating >= i ? 'fa-star yellow' : 'fa-star-o'}"></i>`;
        }
        return ratingResult;
    },

    likedMovie: () => {
        document.querySelectorAll('.fa-heart-o').forEach(item => {
            item.addEventListener('click', event => {
                item.setAttribute("class", "fa fa-heart red");
            })
        })
    },

    loadGenresName: (genres) => {
        let genresName = [];
        genres.forEach((ele, index) => {
            genresName.push(ele.name);
        })
        return genresName;
    },

    loadCastName: (cast) => {
        let castDetails = [];
        let template = [];
        cast.forEach((ele, index) => {
            castDetails.push({ id: ele.id, name: ele.name })
        })
        castDetails.forEach(castData => {
            template.push(`<a class="category__item--detail" href="actor-detail.html?id=${castData.id}">${castData.name}</a>`)
        })
        return template;
    },

    loadDirectorName: (crew) => {
        let directorName = '';
        crew.forEach(ele => {
            if (ele.job === "Director") {
                directorName = ele.name;
            }
        })
        return directorName;
    }
}

export { general }