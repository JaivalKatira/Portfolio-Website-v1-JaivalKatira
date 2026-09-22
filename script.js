// ===== PORTFOLIO DATA =====
// Edit these arrays to update your site content — no HTML editing needed.
// `skills` on each project must match the text of a pill in the `skills` array below.

const experiences = [
  {
    title: "Business Analyst Intern",
    company: "Brizall Grounding Systems",
    dates: "April 2026 – June 2026",
    description:
      "Analyzed operational datasets to identify trends, implemented sales automation systems, and used data visualization tools to present actionable insights to senior management."
  },
  {
    title: "Finance Research Analyst",
    company: "Gravitas Mentor",
    dates: "June 2025 – July 2025",
    description:
      "Conducted deep-dive research into financial markets and investment instruments, leveraging 2+ years of personal investing experience to evaluate market volatility and asset performance."
  },
  {
    title: "Data Analyst Intern",
    company: "Rifa Pharma",
    dates: "Sept 2024 – Dec 2024",
    description:
      "Analyzed operational datasets to identify trends and improve reporting efficiency, and utilized data visualization tools to present actionable insights to senior management."
  }
];

const projects = [
  {
    title: "ReSecureOS",
    role: "Data Specialist",
    description: "Architected a complete data cleansing and recovery pipeline for a high-volume dataset.",
    details:
      "Optimized data integrity, advancing the team to the national-level evaluation rounds.",
    skills: ["C++"],
    link: "https://github.com/sanyampat/ReSecureOS-Open-Source-Data-Recovery-Sanitization-Tool"
  },
  {
    title: "Sales Lead Automation Pipeline",
    role: "Sales Project",
    description:
      "Built an end-to-end lead generation and outreach pipeline integrating Google Maps API, Selenium, and multiple LLM providers (Groq, Cerebras, NVIDIA NIM) to source, qualify, and message business leads at scale.",
    details:
      "Engineered a 3-stage architecture (lead scraping → AI context generation → automated message sending) with tiered LLM fallback logic, cutting pipeline failure rate to near-zero across 20+ leads per run.",
    skills: ["Python", "Multi Agent Work Flows"],
    link: "https://github.com/JaivalKatira/Sales-Automation"
  },
  {
    title: "NSE Gap Signals",
    role: "Trading Project",
    description:
      "Built a fully automated, serverless trading signal scanner for NSE stocks using Python and GitHub Actions, computing RSI(10) with Wilder smoothing and SMA(200) across the equity universe to flag candidate gap-reversion setups daily.",
    details:
      "Designed a two-stage validation pipeline (signal scan → next-morning confirmation) using GitHub Actions artifacts for state persistence and automated SMTP email alerts, reducing false signals by only surfacing confirmed calls to the user.",
    skills: ["Python", "Data Analysis", "Machine Learning"],
    link: "https://github.com/JaivalKatira/Trading-Bot_v1"
  }
];

const skills = [
  "Python",
  "Data Analysis",
  "Machine Learning",
  "SQL",
  "HTML",
  "R",
  "C++",
  "RAG Systems",
  "Multi Agent Work Flows"
];

// ===== RENDER EXPERIENCE =====
function renderExperience() {
  const container = document.getElementById("experience-container");
  if (!container) return;

  container.innerHTML = experiences
    .map(
      (exp) => `
      <article class="experience-item">
        <div class="experience-header">
          <h3>${exp.title}</h3>
          <span class="experience-dates">${exp.dates}</span>
        </div>
        <p class="experience-company">${exp.company}</p>
        <p class="experience-description">${exp.description}</p>
      </article>
    `
    )
    .join("");
}

// ===== RENDER PROJECTS =====
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card" data-skills="${project.skills.join("|")}">
        <h3>${project.title}</h3>
        <p class="project-role">${project.role}</p>
        <p class="project-summary">${project.description}</p>
        <div class="project-details">
          <p>${project.details}</p>
          <div class="project-skill-tags">
            ${project.skills.map((s) => `<span class="mini-skill">${s}</span>`).join("")}
          </div>
        </div>
        <a href="${project.link}" target="_blank" rel="noopener">View project →</a>
      </article>
    `
    )
    .join("");
}

// ===== RENDER SKILLS =====
function renderSkills() {
  const container = document.querySelector(".skill-container");
  if (!container) return;

  container.innerHTML = skills
    .map((skill) => `<span class="skill-pill" data-skill="${skill}" tabindex="0">${skill}</span>`)
    .join("");
}

// ===== SKILL <-> PROJECT LINKING (feature 2) =====
function setupSkillProjectLinking() {
  const pills = document.querySelectorAll(".skill-pill");
  const cards = document.querySelectorAll(".project-card");
  const infoEl = document.getElementById("skill-info");

  if (!pills.length || !cards.length) return;

  function activateSkill(skillName) {
    const matches = [];

    cards.forEach((card) => {
      const cardSkills = (card.dataset.skills || "").split("|");
      const isMatch = cardSkills.includes(skillName);
      card.classList.toggle("project-highlight", isMatch);
      if (isMatch) {
        matches.push(card.querySelector("h3")?.textContent || "");
      }
    });

    if (infoEl) {
      infoEl.textContent = matches.length
        ? `${skillName} was used in: ${matches.join(", ")}`
        : `No projects tagged with ${skillName} yet.`;
      infoEl.classList.add("skill-info-active");
    }
  }

  function resetSkill() {
    cards.forEach((card) => card.classList.remove("project-highlight"));
    if (infoEl) {
      infoEl.textContent = "Hover over a skill to see which projects used it.";
      infoEl.classList.remove("skill-info-active");
    }
  }

  pills.forEach((pill) => {
    const skillName = pill.dataset.skill;
    pill.addEventListener("mouseenter", () => activateSkill(skillName));
    pill.addEventListener("mouseleave", resetSkill);
    // Keyboard/touch accessibility
    pill.addEventListener("focus", () => activateSkill(skillName));
    pill.addEventListener("blur", resetSkill);
  });
}

// ===== FOOTER YEAR =====
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== MOBILE NAV TOGGLE =====
function setupNavToggle() {
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelector(".nav-links");
  if (!nav || !navLinks) return;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "nav-toggle";
  toggleBtn.setAttribute("aria-label", "Toggle navigation menu");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.innerHTML = "&#9776;";
  nav.insertBefore(toggleBtn, navLinks);

  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function setupActiveNavHighlight() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ===== SCROLL FADE-IN ANIMATION =====
function setupScrollFadeIn() {
  const panels = document.querySelectorAll(".panel");
  if (!panels.length) return;

  panels.forEach((panel) => panel.classList.add("fade-init"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  panels.forEach((panel) => observer.observe(panel));
}

// ===== HERO NAME CURSOR-REPEL ANIMATION (feature 3) =====
function setupHeroNameAnimation() {
  const titleEl = document.querySelector(".hero-title");
  const heroEl = document.querySelector(".hero");
  if (!titleEl || !heroEl) return;

  const text = titleEl.textContent;
  titleEl.textContent = "";
  titleEl.classList.add("hero-title-animated");

  const letters = [...text].map((char) => {
    const span = document.createElement("span");
    span.className = "hero-letter";
    span.textContent = char === " " ? "\u00A0" : char;
    titleEl.appendChild(span);
    return span;
  });

  const REPEL_RADIUS = 70; // how close the cursor needs to be, in px
  const REPEL_STRENGTH = 28; // max distance a letter moves away, in px

  let baseCenters = [];

  function cacheBaseCenters() {
    letters.forEach((letter) => (letter.style.transform = "translate(0, 0)"));
    baseCenters = letters.map((letter) => {
      const rect = letter.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
  }

  function handleMove(e) {
    letters.forEach((letter, i) => {
      const { x: letterX, y: letterY } = baseCenters[i];
      const dx = letterX - e.clientX;
      const dy = letterY - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      if (distance < REPEL_RADIUS) {
        const force = 1 - distance / REPEL_RADIUS;
        const moveX = (dx / distance) * REPEL_STRENGTH * force;
        const moveY = (dy / distance) * REPEL_STRENGTH * force;
        letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        letter.style.transform = "translate(0, 0)";
      }
    });
  }

  function resetLetters() {
    letters.forEach((letter) => (letter.style.transform = "translate(0, 0)"));
  }

  cacheBaseCenters();
  window.addEventListener("resize", cacheBaseCenters);
  heroEl.addEventListener("mousemove", handleMove);
  heroEl.addEventListener("mouseleave", resetLetters);
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderExperience();
  renderProjects();
  renderSkills();
  setFooterYear();
  setupNavToggle();
  setupActiveNavHighlight();
  setupScrollFadeIn();
  setupSkillProjectLinking();
  setupHeroNameAnimation();
});
