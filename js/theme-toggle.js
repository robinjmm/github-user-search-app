const storageKey = "theme-preference";

function getUserPreference() {
	if (localStorage.getItem(storageKey)) {
		return localStorage.getItem(storageKey);
	}
	return "dark";
}

const theme = {
	value: getUserPreference(),
};

function reflectPreference() {
	document.documentElement.setAttribute("data-theme", theme.value);
}

function setPreference() {
	localStorage.setItem(storageKey, theme.value);
	reflectPreference();
}

reflectPreference();

window.addEventListener("load", () => {
	const toggleLight = document.querySelector(".js-light-toggle");
	const toggleDark = document.querySelector(".js-dark-toggle");

	function displayToggles() {
		if (theme.value === "light") {
			toggleLight.classList.add("hidden");
			toggleDark.classList.remove("hidden");
		} else {
			toggleLight.classList.remove("hidden");
			toggleDark.classList.add("hidden");
		}
	}

	displayToggles();

	toggleDark.addEventListener("click", () => {
		theme.value = theme.value === "dark" ? "light" : "dark";
		setPreference();
		displayToggles();
	});

	toggleLight.addEventListener("click", () => {
		theme.value = theme.value === "dark" ? "light" : "dark";
		setPreference();
		displayToggles();
	});
});
