import "@fontawesome/fontawesome.css";
import "@fontawesome/brands.css";
import "@styles/styles.scss";
import { wrapperFetch } from "./responseError.js";
import * as User from "./user.js";

const API_ENDPOINT = "https://api.github.com/users/";

async function getUser(user = "octocat") {
    try {
        const res = await wrapperFetch(`${API_ENDPOINT}${user}`);
        return await res.json();
    } catch (error) {
        switch (error.response) {
            case 400:
                console.error("Bad Request Sent");
                break;
            case 401:
                console.error("Not Authorized");
                break;
            case 404:
                console.error("Resource Not Found");
                break;
            case 500:
                console.error("Internal Server Error");
                break;
            default:
                console.error(`Unknown Error: ${error}`);
                break;
        }
    }
}

function displayData(data) {
    User.updateAvatar(".js-avatar", data.avatar_url);

    User.updatePublicName(".js-public-name", data.name)

    User.updateUsername(".js-username", data.login, data.html_url);

    User.updateJoinedDate(".js-joined-date", data.created_at);

    User.updateBio(".js-bio", data.bio);

    User.updateStats(".js-repos", data.public_repos);

    User.updateStats(".js-followers", data.followers);

    User.updateStats(".js-following", data.following);

    User.updateWebsite(".js-website", data.blog);

    User.updateTwitter(".js-twitter", data.twitter_username);

    User.updateLocationAndCompany(".js-location", data.location);

    User.updateLocationAndCompany(".js-company", data.company);
}

window.addEventListener("DOMContentLoaded", async () => {
    const searchForm = document.querySelector(".js-search-form");
    const searchButton = document.querySelector(".js-search-button");

    let data = await getUser();
    displayData(data);

    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();
        data = await getUser(searchForm.value.trim());
        displayData(data);
    });
});