// eslint-disable-next-line import/no-unresolved
import "@fontawesome/fontawesome.min.css";
// eslint-disable-next-line import/no-unresolved
import "@fontawesome/brands.min.css";
// eslint-disable-next-line import/no-unresolved
import "@styles/styles.scss";

import displayUserData from "./user";

const searchForm = document.querySelector(".js-search-form");
const searchButton = document.querySelector(".js-search-button");
const errorMessage = document.querySelector(".js-search-error");
const card = document.querySelector(".js-card");

const API_ENDPOINT = "https://api.github.com/users/";

async function getUser(user = "octocat") {
	try {
		const res = await fetch(`${API_ENDPOINT}${user}`);
		return await res.json();
	} catch (error) {
		return false;
	}
}

// Display an error when fetch fails to communicate with the API
function displayFetchError() {
	errorMessage.innerText = "Fetch Error";
	errorMessage.classList.remove("error--hidden");
	searchForm.placeholder = "";
	card.classList.add("hidden");
}

window.addEventListener("DOMContentLoaded", async () => {
	// Get the default user request "octocat" on intial page load.
	let data = await getUser();

	if (!data) {
		displayFetchError();
	} else {
		displayUserData(data);
	}

	// Hide the error message when user types in the search form.
	searchForm.addEventListener("input", () => {
		errorMessage.classList.add("hidden");
	});

	searchButton.addEventListener("click", async (event) => {
		event.preventDefault();
		data = await getUser(searchForm.value.trim());

		// if... block checks if there is an Fetch API Error
		// else if... block checks if there's a message property,
		// the expression evaluates "true" if the response code is not 200;
		// else... block renders the data from the API.
		if (!data) {
			displayFetchError();
		} else if (data.message) {
			searchForm.placeholder = "";
			errorMessage.innerText = "No results";
			errorMessage.classList.remove("hidden");
		} else {
			displayUserData(data);
			searchForm.value = "";
			searchForm.placeholder = "Search GitHub username...";
		}
	});
});
