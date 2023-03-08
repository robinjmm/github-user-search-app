const DATE_FORMAT_OPTIONS = { day: "numeric", month: "short", year: "numeric" };

function convertDate(isoDate, options = DATE_FORMAT_OPTIONS) {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-us", options).replace(",", "");
    return `Joined ${formattedDate}`;
}

// Grey out and disable interaction with any element that has no available info from the API.
function disableElement(element) {
    if (element && element.previousElementSibling) {
        element.previousElementSibling.style.fill = "var(--text-disabled)";
        element.classList.add("disabled");
        element.parentElement.classList.add("not-allowed");
    } else {
        element.classList.add("disabled");
        element.parentElement.classList.add("not-allowed");
    }
}

// Re enable previously disabled elements
function enableElement(element) {
    if (element && element.previousElementSibling) {
        element.previousElementSibling.style.fill = "var(--text-primary)";
        element.classList.remove("disabled");
        element.parentElement.classList.remove("not-allowed");
    } else {
        element.classList.remove("disabled");
        element.parentElement.classList.remove("not-allowed");
    }
}

export function updateAvatar(className, data) {
    const avatar = document.querySelector(className);
    avatar.src = data;
}

export function updatePublicName(className, data) {
    const publicName = document.querySelector(className);
    const content = data ? data : "";
    publicName.innerText = content;
}

export function updateUsername(className, data, link) {
    const username = document.querySelector(className);
    const content = data ? data : "";
    username.innerText = `@${content}`;
    username.href = link;
}

export function updateJoinedDate(className, data) {
    const joinedDate = document.querySelector(className);
    const date = convertDate(data);
    joinedDate.innerText = date;
}

export function updateBio(className, data) {
    const userBio = document.querySelector(className);
    if (!data) {
        userBio.innerText = "This profile has no bio";
        disableElement(userBio);
    } else {
        userBio.innerText = data;
        enableElement(userBio);
    }
}

export function updateStats(className, data) {
    const userStats = document.querySelector(className);
    const value = data === 0 ? 0 : data;
    userStats.innerText = value;
}

export function updateLocationAndCompany(className, data) {
    const userLocationAndCompany = document.querySelector(className);
    if (!data) {
        userLocationAndCompany.innerText = "Not Available";
        disableElement(userLocationAndCompany);
    } else {
        userLocationAndCompany.innerText = data;
        enableElement(userLocationAndCompany);
    }
}

export function updateWebsite(className, data) {
    const userWebsite = document.querySelector(className);
    if (!data) {
        userWebsite.innerText = "Not Available";
        disableElement(userWebsite);
    } else {
        userWebsite.innerText = data;
        userWebsite.href = data;
        enableElement(userWebsite);
    }
}

export function updateTwitter(className, data) {
    const userTwitter = document.querySelector(className);
    if (!data) {
        userTwitter.innerText = "Not Available";
        disableElement(userTwitter);
    } else {
        userTwitter.innerText = data;
        userTwitter.href = `https://twitter.com/${data}`;
        enableElement(userTwitter);
    }
}