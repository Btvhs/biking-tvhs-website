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
                addPost(title, category, content, imageUrl);
            };
            reader.readAsDataURL(imageFile);
        } else {
            addPost(title, category, content, imageUrl);
        }

        this.reset();
    });

    function addPost(title, category, content, imageUrl) {
        const container = document.getElementById(`${category}-container`);
        const postElement = document.createElement("div");
        postElement.classList.add("news-item");
        postElement.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; border-radius: 5px; margin-top: 10px;">` : ""}
        `;
        container.prepend(postElement);
    }
});
