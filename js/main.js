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

const DATE_FORMAT_OPTIONS = {day: "numeric", month: "long", year: "numeric"};

function convertDate(isoDate, options = DATE_FORMAT_OPTIONS) {
    try {
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleDateString("en-us", options).replace(",", "");
        return `Joined ${formattedDate}`;
    } catch (error) {
        console.error("error");
        return "Invalid Date";
    }
}

function updateElement(element, data) {
    try {
        const el = typeof element === "string" ? document.querySelector(element) : element;

        switch (el.classList[0]) {
            case ".js-bio":
                el.innerText = data || "This profile has no bio";
                break;
            case ".js-username":
                el.innerText = `@${data}`;
                break;
            case ".js-avatar":
                el.src = data;
                break;
            default:
                el.innerText = data || "Not Available";
                break;
        }
    } catch (error) {
        console.error(`Error updating the element: ${error}`);
    }
}

function setLink(element, data) {
    const el = document.querySelector(element);

    if (!data) {
        el.style.cursor = "not-allowed";
    } else {
        el.href = data;
        el.target = "_blank";
    }
}

window.addEventListener("DOMContentLoaded", async () => {
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

    updateElement(".js-avatar", avatar_url);
    updateElement(".js-username", login);
    updateElement(".js-public-name", name);
    updateElement(".js-joined-date", convertDate(created_at));
    updateElement(".js-bio", bio);
    updateElement(".js-repos", public_repos);
    updateElement(".js-followers", followers);
    updateElement(".js-following", following);
    updateElement(".js-location", location);
    updateElement(".js-website", blog);
    updateElement(".js-twitter", twitter_username);
    updateElement(".js-company", company);

    setLink(".js-username", html_url);
    setLink(".js-website", blog);
    setLink(".js-twitter", twitter_username);
});