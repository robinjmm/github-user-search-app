import "@fontawesome/fontawesome.css";
import "@fontawesome/brands.css";
import "@styles/styles.scss";
import * as User from "./user.js";

const API_ENDPOINT = "https://api.github.com/users/";

async function getUser(user = "octocat") {
    try {
        const res = await fetch(`${API_ENDPOINT}${user}`);
        return await res.json();
    } catch (error) {
        console.error(`Error: ${error}`);
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
    const errorMessage = document.querySelector(".js-search-error");

    let data = await getUser();
    displayData(data);

    searchForm.addEventListener("input", () => {
        errorMessage.classList.add("error--hidden");
    })

    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();
        data = await getUser(searchForm.value.trim());
        if (!data.message) {
            displayData(data);
            searchForm.value = "";
        } else {
            errorMessage.innerText = "No results";
            errorMessage.classList.remove("error--hidden");
        }
    });
});