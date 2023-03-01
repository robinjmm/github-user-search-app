import "@fontawesome/fontawesome.css";
import "@fontawesome/brands.css";
import "@styles/styles.scss";


async function getUser(user = "octocat") {
    const response = await fetch(`https://api.github.com/users/${user}`);
    return await response.json();
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
        element.href = "#";
        element.style.cursor = "not-allowed";
    } else {
        element.href = data;
        element.target = "_blank";
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const searchForm = document.querySelector(".js-search-form");
    const searchButton = document.querySelector(".js-search-button");
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

    searchButton.addEventListener("click", event => {
        event.preventDefault();
    })

    const data = await getUser("robinjmm");
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
})