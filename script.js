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

/* Scroll reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(25px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

html {
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 80px;
}

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