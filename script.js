document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 50) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

    document.querySelectorAll(".read-more").forEach((button) => {
        button.addEventListener("click", function () {
            const parentContainer = this.closest(".news-item, .event, .announcement");

            if (parentContainer) {
                const extraContent = parentContainer.querySelector(".extra-content, .extra-announcement");

                if (extraContent) {
                    if (extraContent.style.display === "none" || extraContent.style.display === "") {
                        extraContent.style.display = "block";
                        this.textContent = "Read Less";
                    } else {
                        extraContent.style.display = "none";
                        this.textContent = "Read More";
                    }
                }
            }
        });
    });

    function loadPosts() {
        const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts.forEach((post, index) => addPost(post.title, post.category, post.content, post.imageUrl, false, index));
    }

    document.getElementById("post-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const content = document.getElementById("content").value;
        const imageInput = document.getElementById("image");
        const imageFile = imageInput.files[0];
        let imageUrl = "";

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageUrl = e.target.result;
                saveAndAddPost(title, category, content, imageUrl);
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveAndAddPost(title, category, content, imageUrl);
        }

        this.reset();
    });

    function saveAndAddPost(title, category, content, imageUrl) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const newPost = { title, category, content, imageUrl };
        posts.unshift(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));
        addPost(title, category, content, imageUrl, true, 0);
    }

    function addPost(title, category, content, imageUrl, isNew, index) {
        const container = document.getElementById(`${category}-container`);
        const postElement = document.createElement("div");
        postElement.classList.add("news-item");
        postElement.innerHTML = `
            <h3>${title}</h3>
            <p style="white-space: pre-line;">${content}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; border-radius: 5px; margin-top: 10px;">` : ""}
            <button class="delete-post" data-index="${index}">Delete</button>
        `;

        if (isNew) {
            container.prepend(postElement);
        } else {
            container.appendChild(postElement);
        }
    }

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-post")) {
            const index = event.target.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this post?")) {
                deletePost(index);
            }
        }
    });

    function deletePost(index) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        location.reload();
    }

    loadPosts();
});
