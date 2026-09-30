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
    role: "Personal Project",
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
// Left: clickable project titles. Right: one full panel per project, stacked vertically.
function renderProjects() {
  const index = document.getElementById("work-index");
  const scroller = document.getElementById("work-scroller");
  if (!index || !scroller) return;

  index.innerHTML = projects
    .map(
      (project, i) => `
      <li>
        <button type="button" class="work-index-item" data-index="${i}" aria-controls="project-${i}">
          <span class="work-index-title">${project.title}</span>
          <span class="work-index-role">${project.role}</span>
        </button>
      </li>
    `
    )
    .join("");

  scroller.innerHTML = projects
    .map(
      (project, i) => `
      <article class="project-card project-panel" id="project-${i}" data-skills="${project.skills.join("|")}">
        <p class="project-role">${project.role}</p>
        <h3>${project.title}</h3>
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

// ===== WORK: CLICK-TO-SCROLL BETWEEN PROJECTS =====
// The project scroller has no wheel/drag scrolling (overflow hidden), so the mouse wheel
// keeps moving between slides. Projects change only when a title is clicked.
function setupWorkNavigation() {
  const scroller = document.getElementById("work-scroller");
  const items = Array.from(document.querySelectorAll(".work-index-item"));
  const panels = Array.from(document.querySelectorAll(".project-panel"));
  if (!scroller || !items.length || items.length !== panels.length) return;

  let activeIndex = 0;

  function setActive(i) {
    activeIndex = i;
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === i);
      item.setAttribute("aria-current", idx === i ? "true" : "false");
    });
  }

  function scrollToProject(i) {
    scroller.scrollTo({ top: panels[i].offsetTop, behavior: "smooth" });
    setActive(i);
  }

  items.forEach((item, i) => item.addEventListener("click", () => scrollToProject(i)));

  // Keep the current project aligned on resize
  window.addEventListener("resize", () => {
    scroller.scrollTo({ top: panels[activeIndex].offsetTop, behavior: "auto" });
  });

  setActive(0);
}

// ===== RENDER SKILLS =====
function renderSkills() {
  const container = document.querySelector(".skill-container");
  if (!container) return;

  container.innerHTML = skills
    .map(
      (skill) =>
        `<span class="skill-pill" data-skill="${skill}" role="button" aria-pressed="false" tabindex="0">${skill}</span>`
    )
    .join("");
}

// ===== SKILL <-> PROJECT LINKING =====
// Click a skill to list the projects that used it. Click it again to clear.
function setupSkillProjectLinking() {
  const pills = document.querySelectorAll(".skill-pill");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const infoEl = document.getElementById("skill-info");

  if (!pills.length || !cards.length || !infoEl) return;

  const DEFAULT_TEXT = "Click a skill to see which projects used it.";
  let selected = null;

  function showSkill(skillName) {
    const matches = cards.filter((card) =>
      (card.dataset.skills || "").split("|").includes(skillName)
    );

    cards.forEach((card) => card.classList.toggle("project-highlight", matches.includes(card)));
    pills.forEach((pill) => {
      const on = pill.dataset.skill === skillName;
      pill.classList.toggle("selected", on);
      pill.setAttribute("aria-pressed", on ? "true" : "false");
    });

    infoEl.textContent = "";
    const lead = document.createElement("p");
    lead.className = "skill-info-lead";
    lead.textContent = matches.length
      ? `${skillName} was used in:`
      : `No projects tagged with ${skillName} yet.`;
    infoEl.appendChild(lead);

    if (matches.length) {
      const list = document.createElement("div");
      list.className = "skill-info-projects";
      matches.forEach((card) => {
        const chip = document.createElement("span");
        chip.className = "skill-project-chip";
        const title = document.createElement("strong");
        title.textContent = card.querySelector("h3")?.textContent || "";
        const role = document.createElement("span");
        role.textContent = card.querySelector(".project-role")?.textContent || "";
        chip.append(title, role);
        list.appendChild(chip);
      });
      infoEl.appendChild(list);
    }
    infoEl.classList.add("skill-info-active");
  }

  function clearSkill() {
    cards.forEach((card) => card.classList.remove("project-highlight"));
    pills.forEach((pill) => {
      pill.classList.remove("selected");
      pill.setAttribute("aria-pressed", "false");
    });
    infoEl.textContent = DEFAULT_TEXT;
    infoEl.classList.remove("skill-info-active");
  }

  pills.forEach((pill) => {
    const skillName = pill.dataset.skill;
    pill.addEventListener("click", () => {
      if (selected === skillName) {
        selected = null;
        clearSkill();
      } else {
        selected = skillName;
        showSkill(skillName);
      }
    });
    // Keyboard access: Enter / Space act like a click
    pill.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pill.click();
      }
    });
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

// ===== HORIZONTAL SLIDE NAVIGATION (PPT-style) =====
function setupSlideNavigation() {
  const container = document.getElementById("slides-container");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
  const dotsContainer = document.getElementById("slide-dots");

  if (!container || !slides.length) return;

  // Build pagination dots, one per slide
  const dots = slides.map((slide, i) => {
    const dot = document.createElement("button");
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}${slide.id ? `: ${slide.id}` : ""}`);
    dot.addEventListener("click", () => goToSlide(slide));
    dotsContainer?.appendChild(dot);
    return dot;
  });

  function goToSlide(slide) {
    container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }

  function currentSlideIndex() {
    let closest = 0;
    let closestDistance = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - container.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    return closest;
  }

  // Nav links (and logo) scroll smoothly to the matching slide instead of jumping
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const targetSlide = document.getElementById(targetId);
      if (targetSlide) {
        e.preventDefault();
        goToSlide(targetSlide);
      }
    });
  });

  // Convert vertical wheel/trackpad scroll into horizontal slide movement
  container.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    },
    { passive: false }
  );

  // Arrow-key navigation between slides
  window.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const index = currentSlideIndex();
    const nextIndex = e.key === "ArrowRight"
      ? Math.min(index + 1, slides.length - 1)
      : Math.max(index - 1, 0);
    goToSlide(slides[nextIndex]);
  });

  // Track which slide is active: highlight its nav link and dot, trigger its entrance animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = slides.indexOf(entry.target);
        entry.target.classList.toggle("slide-active", entry.isIntersecting);

        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
          dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        }
      });
    },
    { root: container, threshold: 0.6 }
  );

  slides.forEach((slide) => observer.observe(slide));

  // Keep the current slide aligned if the viewport is resized
  window.addEventListener("resize", () => {
    const index = currentSlideIndex();
    container.scrollTo({ left: slides[index].offsetLeft, behavior: "auto" });
  });
}

// ===== DECK PROGRESS BAR =====
// Fill = how much of the deck has been reached (first slide = 1/N, last slide = 100%).
function setupProgressBar() {
  const container = document.getElementById("slides-container");
  const fill = document.getElementById("deck-progress-fill");
  if (!container || !fill) return;

  function update() {
    const reached = (container.scrollLeft + container.clientWidth) / container.scrollWidth;
    fill.style.transform = `scaleX(${Math.min(1, Math.max(0, reached))})`;
  }

  container.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

// ===== NAME CURSOR-REPEL ANIMATION (feature 3) =====
function setupHeroNameAnimation() {
  const markEl = document.getElementById("site-mark");
  const navEl = document.querySelector(".site-nav");
  if (!markEl || !navEl) return;

  const text = markEl.textContent;
  markEl.textContent = "";

  const letters = [...text].map((char) => {
    const span = document.createElement("span");
    span.className = "repel-letter";
    span.textContent = char === " " ? "\u00A0" : char;
    markEl.appendChild(span);
    return span;
  });

  const REPEL_RADIUS = 45; // how close the cursor needs to be, in px
  const REPEL_STRENGTH = 14; // max distance a letter moves away, in px

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
  navEl.addEventListener("mousemove", handleMove);
  navEl.addEventListener("mouseleave", resetLetters);
}

// ===== ROTARY IMAGE WHEEL =====
// One card per slide, placed around a wheel. Wheel rotation = scroll position, so it is
// fully scrubbable: scrolling forward rotates one way, scrolling back reverses it.
// Card images: assets/image_<slide-id>.jpg  (hero, about, work, experience, skills, contact)
function setupImageWheel() {
  const container = document.getElementById("slides-container");
  const wheel = document.getElementById("wheel");
  const slides = Array.from(document.querySelectorAll(".slide"));
  if (!container || !wheel || !slides.length) return;

  const step = 360 / slides.length; // degrees of rotation per slide

  const cards = slides.map((slide, i) => {
    const card = document.createElement("figure");
    card.className = "wheel-card";
    card.style.setProperty("--a", `${i * step}deg`);

    const src = `assets/image_${slide.id}.jpg`;
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.draggable = false;
    img.addEventListener("error", () => {
      img.remove();
      card.classList.add("missing");
    });

    const missing = document.createElement("span");
    missing.className = "wheel-missing";
    missing.textContent = src;

    card.append(img, missing);
    wheel.appendChild(card);
    return card;
  });

  let ticking = false;

  function update() {
    ticking = false;
    const slideWidth = slides[1] ? slides[1].offsetLeft : container.clientWidth || 1;
    const pos = Math.min(slides.length - 1, Math.max(0, container.scrollLeft / slideWidth));

    wheel.style.transform = `rotate(${-pos * step}deg)`;

    cards.forEach((card, i) => {
      const d = Math.min(1, Math.abs(pos - i));
      card.style.opacity = String(1 - d); // crossfade between neighbouring slides
      card.style.zIndex = String(Math.round(100 - d * 50));
    });
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  container.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}

// ===== THEME TOGGLE (dark: black + yellow, light: milky white + yellow) =====
function setupThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    btn.setAttribute("aria-checked", isDark ? "true" : "false");
    btn.setAttribute("aria-label", isDark ? "Dark mode" : "Light mode");
  }

  apply(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderExperience();
  renderProjects();
  renderSkills();
  setFooterYear();
  setupNavToggle();
  setupSlideNavigation();
  setupSkillProjectLinking();
  setupHeroNameAnimation();
  setupWorkNavigation();
  setupProgressBar();
  setupThemeToggle();
  setupImageWheel();
});
