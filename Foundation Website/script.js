/* DARK MODE */

const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const icon = darkModeBtn.querySelector("i");

        if (icon) {

            if (document.body.classList.contains("dark-mode")) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }

        }

    });

}

/* COUNTER ANIMATION */

const counters = document.querySelectorAll(".counter");

const runCounter = () => {

    counters.forEach(counter => {

        const target =
        Number(counter.dataset.target);

        let count = 0;

        const speed = Math.max(
            1,
            Math.floor(target / 100)
        );

        const update = () => {

            count += speed;

            if (count >= target) {

                counter.innerText =
                target.toLocaleString();

            } else {

                counter.innerText =
                count.toLocaleString();

                requestAnimationFrame(update);

            }

        };

        update();

    });

};

if (counters.length > 0) {
    runCounter();
}

/* FAQ ACCORDION */

const faqQuestions =
document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer =
        question.nextElementSibling;

        if (!answer) return;

        document
        .querySelectorAll(".faq-answer")
        .forEach(item => {

            if (item !== answer) {
                item.style.display = "none";
            }

        });

        answer.style.display =
        answer.style.display === "block"
        ? "none"
        : "block";

    });

});

/* SCROLL TO TOP */

const scrollBtn =
document.getElementById("scrollTop");

if (scrollBtn) {

    scrollBtn.style.display = "none";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollBtn.style.display =
            "block";

        } else {

            scrollBtn.style.display =
            "none";

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* STICKY HEADER */

const header =
document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
            "0 4px 15px rgba(0,0,0,.1)";

        } else {

            header.style.boxShadow =
            "none";

        }

    });

}

/* SMOOTH SCROLL */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
    "click",
    function(e) {

        const target =
        document.querySelector(
        this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});

/* REVEAL ON SCROLL */

const revealElements =
document.querySelectorAll(
".about, .impact, .projects, .events, .team, .gallery, .faq, .contact"
);

const reveal = () => {

    const trigger =
    window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const top =
        el.getBoundingClientRect().top;

        if (top < trigger) {

            el.classList.add("show");

        }

    });

};

window.addEventListener(
"scroll",
reveal
);

reveal();

/* PROGRESS BAR */

const progress =
document.querySelector(".progress");

if (progress) {

    let width = 0;

    const target = 65;

    const animation =
    setInterval(() => {

        if (width >= target) {

            clearInterval(animation);

        } else {

            width++;

            progress.style.width =
            width + "%";

        }

    }, 20);

}

/* TEAM HOVER */

const teamCards =
document.querySelectorAll(".team-card");

teamCards.forEach(card => {

    card.addEventListener(
    "mouseenter",
    () => {

        card.style.transform =
        "translateY(-10px)";

        card.style.transition =
        ".3s";

    });

    card.addEventListener(
    "mouseleave",
    () => {

        card.style.transform =
        "translateY(0px)";

    });

});

/* GALLERY LIGHTBOX */

const galleryImages =
document.querySelectorAll(
".gallery-grid img"
);

galleryImages.forEach(image => {

    image.addEventListener(
    "click",
    () => {

        const lightbox =
        document.createElement("div");

        lightbox.style.position =
        "fixed";

        lightbox.style.top = "0";
        lightbox.style.left = "0";
        lightbox.style.width = "100%";
        lightbox.style.height = "100%";

        lightbox.style.background =
        "rgba(0,0,0,.9)";

        lightbox.style.display =
        "flex";

        lightbox.style.alignItems =
        "center";

        lightbox.style.justifyContent =
        "center";

        lightbox.style.zIndex =
        "9999";

        const img =
        document.createElement("img");

        img.src = image.src;

        img.style.maxWidth = "90%";
        img.style.maxHeight = "90%";

        lightbox.appendChild(img);

        document.body.appendChild(
        lightbox
        );

        lightbox.addEventListener(
        "click",
        () => {

            lightbox.remove();

        });

    });

});

/* MOBILE MENU */

const menuBtn =
document.getElementById("menuBtn");

const navbar =
document.querySelector(".navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener(
    "click",
    () => {

        navbar.classList.toggle(
        "active"
        );

    });

}

/* CURRENT YEAR */

const year =
document.getElementById("year");

if (year) {

    year.textContent =
    new Date().getFullYear();

}

console.log(
"✅ InAmigos Foundation Website Loaded Successfully"
);