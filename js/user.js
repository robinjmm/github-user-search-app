const DATE_FORMAT_OPTIONS = { day: "numeric", month: "short", year: "numeric" };

function convertDate(isoDate, options = DATE_FORMAT_OPTIONS) {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-us", options).replace(",", "");
    return `Joined ${formattedDate}`;
}

function disableSociaLink(element) {
    element.innerText = "Not Available";
    // Grey out the svg icons when there is no available info
    element.previousElementSibling.children[0].style.fill = "var(--text-accent-grey)";
    element.classList.add("disabled");
    element.parentElement.classList.add("not-allowed");
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
        userBio.classList.add("disabled");
        userBio.parentElement.classList.add("not-allowed");
    } else {
        userBio.innerText = data;
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
        disableSociaLink(userLocationAndCompany);
    } else {
        userLocationAndCompany.innerText = data;
    }
}

export function updateWebsite(className, data) {
    const userWebsite = document.querySelector(className);
    if (!data) {
        disableSociaLink(userWebsite);
    } else {
        userWebsite.innerText = data;
        userWebsite.href = data;
    }
}

export function updateTwitter(className, data) {
    const userTwitter = document.querySelector(className);
    if (!data) {
        disableSociaLink(userTwitter);
    } else {
        userTwitter.innerText = data;
        userTwitter.href = `https://twitter.com/${data}`;
    }
}