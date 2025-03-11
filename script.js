document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
    loadAnnouncements();
    loadEvents();
});

function submitPost() {
    let title = document.getElementById("news-title").value;
    let content = document.getElementById("news-content").value;
    let imageInput = document.getElementById("news-image").files[0];
    
    if (title.trim() === "" || content.trim() === "") {
        alert("Please enter both a title and content.");
        return;
    }
    
    let post = { id: Date.now(), title, content, image: "", date: new Date().toLocaleString() };
    
    if (imageInput) {
        let reader = new FileReader();
        reader.onload = function (event) {
            post.image = event.target.result;
            savePost(post);
        };
        reader.readAsDataURL(imageInput);
    } else {
        savePost(post);
    }
}

function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postsContainer = document.getElementById("news-list");
    postsContainer.innerHTML = "";
    
    posts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.classList.add("news");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="News Image" style="max-width:100%;">` : ""}
            <small>${post.date}</small>
            <button onclick="deletePost(${post.id})">Delete</button>
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

function submitAnnouncement() {
    let title = document.getElementById("announcement-title").value;
    let content = document.getElementById("announcement-content").value;
    let imageInput = document.getElementById("announcement-image").files[0];
    
    if (title.trim() === "" || content.trim() === "") {
        alert("Please enter both a title and content.");
        return;
    }
    
    let announcement = { id: Date.now(), title, content, image: "", date: new Date().toLocaleString() };
    
    if (imageInput) {
        let reader = new FileReader();
        reader.onload = function (event) {
            announcement.image = event.target.result;
            saveAnnouncement(announcement);
        };
        reader.readAsDataURL(imageInput);
    } else {
        saveAnnouncement(announcement);
    }
}

function saveAnnouncement(announcement) {
    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.unshift(announcement);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    loadAnnouncements();
}

function loadAnnouncements() {
    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    let announcementsContainer = document.getElementById("announcement-list");
    announcementsContainer.innerHTML = "";
    
    announcements.forEach(announcement => {
        let announcementElement = document.createElement("div");
        announcementElement.classList.add("announcement");
        announcementElement.innerHTML = `
            <h3>${announcement.title}</h3>
            <p>${announcement.content}</p>
            ${announcement.image ? `<img src="${announcement.image}" alt="Announcement Image" style="max-width:100%;">` : ""}
            <small>${announcement.date}</small>
            <button onclick="deleteAnnouncement(${announcement.id})">Delete</button>
            <hr>
        `;
        announcementsContainer.appendChild(announcementElement);
    });
}

function deleteAnnouncement(id) {
    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements = announcements.filter(announcement => announcement.id !== id);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    loadAnnouncements();
}

function submitEvent() {
    let title = document.getElementById("event-title").value;
    let date = document.getElementById("event-date").value;
    let details = document.getElementById("event-details").value;
    let imageInput = document.getElementById("event-image").files[0];
    
    if (title.trim() === "" || date.trim() === "" || details.trim() === "") {
        alert("Please enter a title, date, and details.");
        return;
    }
    
    let eventItem = { id: Date.now(), title, date, details, image: "" };
    
    if (imageInput) {
        let reader = new FileReader();
        reader.onload = function (event) {
            eventItem.image = event.target.result;
            saveEvent(eventItem);
        };
        reader.readAsDataURL(imageInput);
    } else {
        saveEvent(eventItem);
    }
}

function saveEvent(eventItem) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.unshift(eventItem);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
}

function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventsContainer = document.getElementById("event-list");
    eventsContainer.innerHTML = "";
    
    events.forEach(event => {
        let eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.details}</p>
            ${event.image ? `<img src="${event.image}" alt="Event Image" style="max-width:100%;">` : ""}
            <button onclick="deleteEvent(${event.id})">Delete</button>
            <hr>
        `;
        eventsContainer.appendChild(eventElement);
    });
}

function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(event => event.id !== id);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
}
