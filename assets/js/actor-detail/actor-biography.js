import { IMAGE_URL, api } from '../variable.js';
import { filmDetail } from './actor-filmography.js';

const url = new URLSearchParams(window.location.search);
const ACTOR_ID = url.get("id");

(function () {
    fetch(api.ACTOR_DETAIL(ACTOR_ID))
        .then(response => {
            return response.json();
        })
        .then(data => {
            actorBiography(data);
        })
        .catch(err => {
            console.log(err);
        })
})();

const actorBiography = (data) => {

    var actorProfile = document.querySelector(".actor-profile");
    var actorImg = document.querySelector(".actor-profile__figure > img");
    actorImg.setAttribute("src", IMAGE_URL + data.profile_path);
    actorImg.setAttribute("alt", data.name);
    actorImg.setAttribute("title", data.name);

    var actorName = document.querySelector(".actor-profile__name");
    actorName.textContent = data.name;

    var actorDob = document.querySelector(".actor-profile__dob");
    actorDob.textContent = data.birthday;

    var actorPopularity = document.querySelector(".actor-profile__rating");
    actorPopularity.textContent = data.popularity;

    var actorSummery = document.querySelector(".actor-profile__summary");
    actorSummery.textContent = data.biography;

}

filmDetail.filmoGraphy();