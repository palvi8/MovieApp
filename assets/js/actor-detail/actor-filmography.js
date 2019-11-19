import { IMAGE_URL, api } from '../variable.js';

const url = new URLSearchParams(window.location.search);
const ACTOR_ID = url.get("id");

export var filmDetail = {
	filmoGraphy: () => {
		fetch(api.ACTOR_FILMOGRAPHY(ACTOR_ID))
			.then(response => {
				return response.json();
			})
			.then(data => {
				filmDetail.actorFilmography(data);
			})
			.catch(err => {
				console.log(err);
			})
	},

	actorFilmography: (actorFilmData) => {

		var panelSection = document.querySelector("#filmPanel");
		var list = document.querySelector("#filmList");
		var panelBody = document.querySelector("#panelBody");

		var releaseYears = [];
		actorFilmData.cast.forEach(item => {
			let releaseYear = item.release_date.split('-')[0];
			if (releaseYears.indexOf(releaseYear) == -1) {
				releaseYears.push(releaseYear)
			}
		})
		releaseYears = releaseYears.sort().reverse();

		releaseYears.forEach((item, index) => {
			let cloneList = document.importNode(list.content, true);
			cloneList.querySelector(".release_year").textContent = item;
			console.log(item);
			panelSection.appendChild(cloneList);

			actorFilmData.cast.forEach((ele, index) => {
				//debugger
				let year = ele.release_date.split("-")[0];
				if (item == year) {
					let clonepanelBody = document.importNode(panelBody.content.querySelectorAll(".movie-panel__list")[0], true);

					clonepanelBody.querySelector(".title").textContent = ele.title;

					clonepanelBody.querySelector(".date").textContent =
						ele.release_date.split("-");

					clonepanelBody.querySelector(".character").textContent = ele.character;

					let ln = panelSection.querySelectorAll(".list").length;
					panelSection.querySelectorAll(".list")[ln - 1].appendChild(clonepanelBody);

				}
			})
		})

	}

}
