// =========================================
// HOPECONNECT FOUNDATION - SCRIPT.JS
// =========================================

// Loader
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 800);
    }
});

// =========================================
// MOBILE MENU
// =========================================

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");

            const icon = menuBtn.querySelector("i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        });
    });
}

// =========================================
// DARK / LIGHT MODE
// =========================================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            localStorage.setItem("theme", "dark");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "light");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';
        }
    });
}

// =========================================
// COUNTER ANIMATION
// =========================================

const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target =
            +counter.getAttribute("data-target");

        const updateCounter = () => {

            const current =
                +counter.innerText.replace(/,/g, "");

            const increment =
                Math.ceil(target / 100);

            if (current < target) {

                counter.innerText =
                    Math.min(current + increment, target)
                        .toLocaleString();

                setTimeout(updateCounter, 20);

            } else {

                counter.innerText =
                    target.toLocaleString() + "+";
            }
        };

        updateCounter();
    });
};

let counterStarted = false;

window.addEventListener("scroll", () => {

    const impactSection =
        document.querySelector(".impact");

    if (!impactSection) return;

    const sectionTop =
        impactSection.offsetTop - 400;

    if (
        window.scrollY > sectionTop &&
        !counterStarted
    ) {
        counterStarted = true;
        startCounter();
    }
});

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealElements = document.querySelectorAll(
    ".section, .program-card, .impact-card, .story-card"
);

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add("fade-up", "show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =========================================
// BACK TO TOP BUTTON
// =========================================

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// =========================================
// HEADER SCROLL EFFECT
// =========================================

const header =
    document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 100) {

        header.style.padding = "14px 8%";
        header.style.boxShadow =
            "0 10px 25px rgba(0,0,0,0.1)";

    } else {

        header.style.padding = "18px 8%";
        header.style.boxShadow =
            "0 10px 20px rgba(0,0,0,0.08)";
    }
});

// =========================================
// SMOOTH SCROLL FOR ANCHORS
// =========================================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});

// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop &&
            pageYOffset <
            sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {
            link.classList.add("active");
        }
    });
});

// =========================================
// CONTACT FORM VALIDATION
// =========================================

const forms =
    document.querySelectorAll("form");

forms.forEach(form => {

    form.addEventListener("submit", e => {

        const inputs =
            form.querySelectorAll(
                "input[required], textarea[required]"
            );

        let valid = true;

        inputs.forEach(input => {

            if (
                input.value.trim() === ""
            ) {

                valid = false;

                input.style.border =
                    "2px solid red";

            } else {

                input.style.border =
                    "1px solid #ccc";
            }
        });

        if (!valid) {

            e.preventDefault();

            alert(
                "Please fill all required fields."
            );
        }
    });
});

// =========================================
// NEWSLETTER SUBSCRIPTION
// =========================================

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            alert(
                "Thank you for subscribing to our newsletter!"
            );

            newsletterForm.reset();
        }
    );
}

// =========================================
// VOLUNTEER FORM BACKEND
// =========================================

const volunteerForm =
document.getElementById("volunteerForm");

if (volunteerForm) {

    volunteerForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const data = {

                name:
                volunteerForm.querySelector(
                    'input[type="text"]'
                ).value,

                email:
                volunteerForm.querySelector(
                    'input[type="email"]'
                ).value,

                phone:
                volunteerForm.querySelector(
                    'input[type="tel"]'
                ).value,

                interest:
                volunteerForm.querySelector(
                    'select'
                ).value
            };

            try {

                const response = await fetch(
                    "https://wed-development-aim4.onrender.com/api/volunteer",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    }
                );

                const result = await response.json();

                alert(result.message);

                volunteerForm.reset();

            } catch (error) {

                console.error(error);

                alert("Unable to connect to server.");
            }
        }
    );
}

// =========================================
// DONATION BUTTONS
// =========================================

document
.querySelectorAll(".donate-btn")
.forEach(button => {

    button.addEventListener("click", function () {

        const amount = this.dataset.amount;

        localStorage.setItem(
            "donationAmount",
            amount
        );

        window.location.href =
            "payment.html";
    });

});

// =========================================
// CONTACT FORM BACKEND
// =========================================

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit", async function(e){

e.preventDefault();

const contact = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
subject: document.getElementById("subject").value,
message: document.getElementById("message").value
};

const status = document.getElementById("status");

try{

const response = await fetch("https://YOUR-BACKEND-URL/api/contact",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(contact)

});

const data = await response.json();

status.style.color="green";
status.innerText=data.message || "Message Sent Successfully!";

contactForm.reset();

}catch(error){

status.style.color="red";
status.innerText="Unable to send message.";

}

});

}

// =========================================
// CURRENT YEAR IN FOOTER
// =========================================

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();
}

// =========================================
// END OF FILE
// =========================================