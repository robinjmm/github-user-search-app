const storageKey = "theme-preference";

const theme = {
    value: getUserPreference()
}

function getUserPreference() {
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    } else {
        return "dark";
    }
}

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
            toggleLight.classList.add("button--hidden");
            toggleDark.classList.remove("button--hidden");
        } else {
            toggleLight.classList.remove("button--hidden");
            toggleDark.classList.add("button--hidden");
        }
    }

    displayToggles();

    toggleDark.addEventListener("click", () => {
        theme.value = theme.value === "dark" ? "light" : "dark";
        setPreference();
        displayToggles();
    })

    toggleLight.addEventListener("click", () => {
        theme.value = theme.value === "dark" ? "light" : "dark";
        setPreference();
        displayToggles();
    })
});