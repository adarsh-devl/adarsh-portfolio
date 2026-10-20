/* Smooth scrolling for navigation links */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* Reveal sections when scrolling */
const sections = document.querySelectorAll(
  ".section, .project-card, .hero"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((section) => {
  section.classList.add("reveal");
  observer.observe(section);
});



/* ===== PORTFOLIO INTERACTIONS ===== */

// Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(
  ".section, .project-card, .skill-list span"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Highlight the active navigation section
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.style.color = "#00d9ff";
          } else {
            link.style.removeProperty("color");
          }
        });
      }
    });
  },
  {
    rootMargin: "-25% 0px -60% 0px"
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});
/* Smooth scrolling for navigation links */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* ===== NEW: PROJECT CARD 3D TILT + MOUSE GLOW ===== */

const interactiveCards = document.querySelectorAll(".project-card");

interactiveCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 4;
        const rotateX = ((centerY - y) / centerY) * 4;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.setProperty("--mouse-x", "50%");
        card.style.setProperty("--mouse-y", "50%");
    });
});

/* ===== EMAILJS CONTACT FORM ===== */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        formStatus.textContent = "Sending message...";
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        try {
            await emailjs.sendForm(
                "service_0gzausg",
                "template_pn9hvg9",
                contactForm,
                {
                    publicKey: "G_TMDvqHDXpGMrO9z"
                }
            );

            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();
        } catch (error) {
            console.error("EmailJS error:", error);
            formStatus.textContent =
                "Message could not be sent. Please try again.";
        } finally {
            submitButton.disabled = false;
        }
    });
}

/* ===== WHATSAPP CONTACT BUTTON ===== */

const whatsappButton = document.getElementById("whatsapp-btn");

if (whatsappButton) {
    whatsappButton.addEventListener("click", function () {
        const name = contactForm.querySelector('[name="name"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const subject = contactForm.querySelector('[name="title"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please fill in all fields first.";
            return;
        }

        const whatsappMessage =
            `Hello Adarsh!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;

        const whatsappNumber = "917307573857";
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");
    });
}
/* ===== DARK / LIGHT MODE TOGGLE ===== */

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);

    if (themeToggle) {
        themeToggle.textContent = isLight
            ? "🌙 Dark Mode"
            : "☀️ Light Mode";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );
    }
}

// Restore saved theme when the page loads
const savedTheme = localStorage.getItem("portfolio-theme");
applyTheme(savedTheme === "light");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isLight = !document.body.classList.contains("light-mode");

        applyTheme(isLight);
        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );
    });
}