const DATE_FORMAT_OPTIONS = { day: "numeric", month: "short", year: "numeric" };

function convertDate(isoDate, options = DATE_FORMAT_OPTIONS) {
	const date = new Date(isoDate);
	const formattedDate = date.toLocaleDateString("en-us", options).replace(",", "");
	return `Joined ${formattedDate}`;
}

// Grey out and disable interaction with any element that has no available info from the API.
function disableElement(el) {
	const element = el;
	if (element.previousElementSibling) {
		element.innerText = "Not Available";
		element.previousElementSibling.style.fill = "var(--text-disabled)";
		element.classList.add("disabled");
		element.parentElement.classList.add("not-allowed");
	} else {
		element.classList.add("disabled");
		element.parentElement.classList.add("not-allowed");
	}
}

// Re enable previously disabled elements
function enableElement(el) {
	const element = el;
	if (element.previousElementSibling) {
		element.previousElementSibling.style.fill = "var(--text-primary)";
		element.classList.remove("disabled");
		element.parentElement.classList.remove("not-allowed");
	} else {
		element.classList.remove("disabled");
		element.parentElement.classList.remove("not-allowed");
	}
}

function updateAvatar(className, data) {
	const avatar = document.querySelector(className);
	avatar.src = data;
}

function updatePublicName(className, data) {
	const publicName = document.querySelector(className);
	const content = data || "";
	publicName.innerText = content;
}

function updateUsername(className, data, link) {
	const username = document.querySelector(className);
	const content = data || "";
	username.innerText = `@${content}`;
	username.href = link;
}

function updateJoinedDate(className, data) {
	const joinedDate = document.querySelector(className);
	const date = convertDate(data);
	joinedDate.innerText = date;
}

function updateBio(className, data) {
	const userBio = document.querySelector(className);
	if (!data) {
		userBio.innerText = "This profile has no bio";
		disableElement(userBio);
	} else {
		userBio.innerText = data;
		enableElement(userBio);
	}
}

function updateStats(className, data) {
	const userStats = document.querySelector(className);
	const value = data === 0 ? 0 : data;
	userStats.innerText = value;
}

function updateLocationAndCompany(className, data) {
	const userLocationAndCompany = document.querySelector(className);
	if (!data) {
		disableElement(userLocationAndCompany);
	} else {
		userLocationAndCompany.innerText = data;
		enableElement(userLocationAndCompany);
	}
}

function updateWebsite(className, data) {
	const userWebsite = document.querySelector(className);
	if (!data) {
		disableElement(userWebsite);
	} else {
		userWebsite.innerText = data;
		userWebsite.href = data;
		enableElement(userWebsite);
	}
}

function updateTwitter(className, data) {
	const userTwitter = document.querySelector(className);
	if (!data) {
		disableElement(userTwitter);
	} else {
		userTwitter.innerText = data;
		userTwitter.href = `https://twitter.com/${data}`;
		enableElement(userTwitter);
	}
}

export default function displayUserData(data) {
	updateAvatar(".js-avatar", data.avatar_url);

	updatePublicName(".js-public-name", data.name);

	updateUsername(".js-username", data.login, data.html_url);

	updateJoinedDate(".js-joined-date", data.created_at);

	updateBio(".js-bio", data.bio);

	updateStats(".js-repos", data.public_repos);

	updateStats(".js-followers", data.followers);

	updateStats(".js-following", data.following);

	updateWebsite(".js-website", data.blog);

	updateTwitter(".js-twitter", data.twitter_username);

	updateLocationAndCompany(".js-location", data.location);

	updateLocationAndCompany(".js-company", data.company);
}
