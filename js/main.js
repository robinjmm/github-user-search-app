import "@fontawesome/fontawesome.css";
import "@fontawesome/brands.css";
import "@styles/styles.scss";
import {wrapperFetch} from "./fetch.js";


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
        }
    }
}

function convertDate(isoDate) {
    const date = new Date(isoDate);
    const options = {year: "numeric", month: "long", day: "numeric"}
    let formattedDate = date.toLocaleDateString("en-us", options);
    formattedDate = formattedDate.replace(",", "");
    return formattedDate;
}

function setContent(element, data) {
    if (!data) {
        element.innerText = "Not Available";
    } else {
        element.innerText = data;
    }
}

function setLink(element, data) {
    if (!data) {
        element.style.cursor = "not-allowed";
    } else {
        element.href = data;
        element.target = "_blank";
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const userAvatar = document.querySelector(".js-avatar");
    const userPublicName = document.querySelector(".js-public-name");
    const username = document.querySelector(".js-username");
    const userJoinedDate = document.querySelector(".js-joined-date");
    const userBio = document.querySelector(".js-bio");
    const userRepos = document.querySelector(".js-repos");
    const userFollowers = document.querySelector(".js-followers");
    const userFollowing = document.querySelector(".js-following");
    const userLocation = document.querySelector(".js-location");
    const userWebsite = document.querySelector(".js-website");
    const userTwitter = document.querySelector(".js-twitter");
    const userCompany = document.querySelector(".js-company");

    const data = await getUser();
    console.log(data);
    const {
        avatar_url,
        name,
        login,
        html_url,
        created_at,
        bio,
        public_repos,
        followers,
        following,
        location,
        blog,
        twitter_username,
        company
    } = data;

    userAvatar.src = avatar_url;
    username.innerText = `@${login}`
    setContent(userPublicName, name);
    setContent(userJoinedDate, convertDate(created_at));
    setContent(userBio, bio);
    setContent(userRepos, public_repos);
    setContent(userFollowers, followers);
    setContent(userFollowing, following);
    setContent(userLocation, location);
    setContent(userWebsite, blog);
    setContent(userTwitter, twitter_username);
    setContent(userCompany, company);

    setLink(username, html_url);
    setLink(userWebsite, blog);
    setLink(userTwitter, twitter_username);
});