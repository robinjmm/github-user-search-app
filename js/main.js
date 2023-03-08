import "@fontawesome/fontawesome.css";
import "@fontawesome/brands.css";
import "@styles/styles.scss";
import displayUserData from "./user";

const API_ENDPOINT = "https://api.github.com/users/";

async function getUser(user = "octocat") {
    try {
        const res = await fetch(`${API_ENDPOINT}${user}`);
        return await res.json();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const searchForm = document.querySelector(".js-search-form");
    const searchButton = document.querySelector(".js-search-button");
    const errorMessage = document.querySelector(".js-search-error");

    // Get the default user request "octocat" on intial page load.
    let data = await getUser();
    displayUserData(data);

    // Hide the error message when user types in the search form.
    searchForm.addEventListener("input", () => {
        errorMessage.classList.add("error--hidden");
    })

    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();
        data = await getUser(searchForm.value.trim());

        // Display data if the response doesn't contain an error message.
        if (!data.message) {
            displayUserData(data);
            searchForm.value = "";
        } else {
            errorMessage.innerText = "No results";
            errorMessage.classList.remove("error--hidden");
        }
    });
});