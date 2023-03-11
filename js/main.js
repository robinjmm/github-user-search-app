// eslint-disable-next-line import/no-unresolved
import "@fontawesome/fontawesome.min.css";
// eslint-disable-next-line import/no-unresolved
import "@fontawesome/brands.min.css";
// eslint-disable-next-line import/no-unresolved
import "@styles/styles.scss";

import displayUserData from "./user";

const API_ENDPOINT = "https://api.github.com/users/";

async function getUser(user = "octocat") {
	try {
		const res = await fetch(`${API_ENDPOINT}${user}`);
		return await res.json();
	} catch (error) {
		return false;
	}
}

window.addEventListener("DOMContentLoaded", async () => {
	const searchForm = document.querySelector(".js-search-form");
	const searchButton = document.querySelector(".js-search-button");
	const errorMessage = document.querySelector(".js-search-error");

	// Get the default user request "octocat" on intial page load.
	let data = await getUser();

	if (!data) {
		errorMessage.innerText = "Fetch Error";
	}

	displayUserData(data);

	// Hide the error message when user types in the search form.
	searchForm.addEventListener("input", () => {
		errorMessage.classList.add("error--hidden");
	});

	searchButton.addEventListener("click", async (event) => {
		event.preventDefault();
		data = await getUser(searchForm.value.trim());

		// Display data if the response doesn't contain an error message.
		if (!data.message) {
			displayUserData(data);
			searchForm.value = "";
			searchForm.placeholder = "Search GitHub username...";
		} else {
			searchForm.placeholder = "";
			errorMessage.innerText = "No results";
			errorMessage.classList.remove("error--hidden");
		}
	});
});
