// ===== PORTFOLIO DATA =====
// Edit these arrays to update your site content — no HTML editing needed.
// `skills` on each project must match the text of a pill in the `skills` array below.

const experiences = [
  {
    title: "Business Analyst Intern",
    company: "Brizall Grounding Systems",
    dates: "April 2026 – June 2026",
    tags: ["Data Analysis", "Sales Automation", "Data Visualization"],
    description:
      "Analyzed operational datasets to identify trends, implemented sales automation systems, and used data visualization tools to present actionable insights to senior management."
  },
  {
    title: "Finance Research Analyst",
    company: "Gravitas Mentor",
    dates: "June 2025 – July 2025",
    tags: ["Market Research", "Investment Analysis"],
    description:
      "Conducted deep-dive research into financial markets and investment instruments, leveraging 2+ years of personal investing experience to evaluate market volatility and asset performance."
  },
  {
    title: "Data Analyst Intern",
    company: "Rifa Pharma",
    dates: "Sept 2024 – Dec 2024",
    tags: ["Data Analysis", "Reporting", "Data Visualization"],
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

const ARROW_SVG =
  '<svg class="md-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// ===== RENDER EXPERIENCE =====
// Left: list of roles. Right: one detail panel per role (shown one at a time).
function renderExperience() {
  const index = document.getElementById("experience-index");
  const stage = document.getElementById("experience-container");
  if (!index || !stage) return;

  index.innerHTML = experiences
    .map(
      (exp, i) => `
      <li>
        <button type="button" class="md-index-item" data-index="${i}" aria-controls="experience-${i}">
          <span class="md-index-text">
            <span class="md-index-title">${exp.title}</span>
            <span class="md-index-meta">${exp.company}</span>
          </span>
          ${ARROW_SVG}
        </button>
      </li>
    `
    )
    .join("");

  stage.innerHTML = experiences
    .map(
      (exp, i) => `
      <article class="md-panel" id="experience-${i}">
        <div class="md-tagrow">
          <span class="md-tag">${exp.dates}</span>
        </div>
        <h3>${exp.title}</h3>
        <p class="md-company">${exp.company}</p>
        <p class="md-text">${exp.description}</p>
        <div class="md-meta">
          <p class="md-meta-label">Focus areas</p>
          <div class="project-skill-tags">
            ${exp.tags.map((t) => `<span class="mini-skill">${t}</span>`).join("")}
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// ===== RENDER PROJECTS =====
// Left: list of projects. Right: one detail panel per project (shown one at a time).
function renderProjects() {
  const index = document.getElementById("work-index");
  const stage = document.getElementById("work-scroller");
  if (!index || !stage) return;

  index.innerHTML = projects
    .map(
      (project, i) => `
      <li>
        <button type="button" class="md-index-item" data-index="${i}" aria-controls="project-${i}">
          <span class="md-index-text">
            <span class="md-index-title">${project.title}</span>
            <span class="md-index-meta">${project.role}</span>
          </span>
          ${ARROW_SVG}
        </button>
      </li>
    `
    )
    .join("");

  stage.innerHTML = projects
    .map(
      (project, i) => `
      <article class="md-panel project-panel" id="project-${i}" data-skills="${project.skills.join("|")}">
        <div class="md-tagrow">
          <span class="md-tag project-role">${project.role}</span>
        </div>
        <h3>${project.title}</h3>
        <p class="md-text">${project.description}</p>
        <p class="md-text">${project.details}</p>
        <div class="md-meta">
          <p class="md-meta-label">Tech stack</p>
          <div class="project-skill-tags">
            ${project.skills.map((s) => `<span class="mini-skill">${s}</span>`).join("")}
          </div>
        </div>
        <a class="md-button" href="${project.link}" target="_blank" rel="noopener">View project ${ARROW_SVG}</a>
      </article>
    `
    )
    .join("");
}

// ===== MASTER / DETAIL (Work + Experience) =====
// Click an item on the left to show its panel on the right. Only one panel is visible at a time.
function setupMasterDetail(indexId, stageId) {
  const index = document.getElementById(indexId);
  const stage = document.getElementById(stageId);
  if (!index || !stage) return;

  const items = Array.from(index.querySelectorAll(".md-index-item"));
  const panels = Array.from(stage.querySelectorAll(".md-panel"));
  if (!items.length || items.length !== panels.length) return;

  function setActive(i) {
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === i);
      item.setAttribute("aria-current", idx === i ? "true" : "false");
    });
    panels.forEach((panel, idx) => panel.classList.toggle("is-active", idx === i));
  }

  items.forEach((item, i) => item.addEventListener("click", () => setActive(i)));
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
  const cards = Array.from(document.querySelectorAll(".project-panel"));
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

  function closeMenu() {
    navLinks.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  // Tap outside the menu, or press Escape, to close it
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
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

  // Mouse wheel / trackpad: a vertical scroll gesture moves one slide at a time.
  // If the current slide is taller than the screen, the wheel first scrolls that slide
  // vertically, and only moves to the next slide once its top/bottom is reached.
  let wheelAccum = 0;
  let wheelLocked = false;
  let lockedAt = 0;
  let lastWheelAt = 0;

  container.addEventListener(
    "wheel",
    (e) => {
      // Normalise line/page-based wheels (Firefox) to pixels
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? container.clientHeight : 1;
      const dx = e.deltaX * unit;
      const dy = e.deltaY * unit;
      const horizontal = Math.abs(dx) > Math.abs(dy) || (e.shiftKey && dx === 0);
      // Dominant axis drives the deck: horizontal swipes, shift+wheel and vertical wheel all step slides
      const delta = horizontal ? (dx || dy) : dy;
      if (!delta) return;

      const slide = e.target.closest ? e.target.closest(".slide") : null;
      // Only vertical gestures may scroll a tall slide's own content first
      if (!horizontal && slide && slide.scrollHeight > slide.clientHeight + 80) {
        const atTop = slide.scrollTop <= 0;
        const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 1;
        if ((dy > 0 && !atBottom) || (dy < 0 && !atTop)) return; // scroll the slide
      }

      e.preventDefault();

      const now = performance.now();
      // Unlock once the previous gesture (including trackpad inertia) has fully died down
      if (wheelLocked && now - lockedAt > 450 && now - lastWheelAt > 100) {
        wheelLocked = false;
        wheelAccum = 0;
      }
      lastWheelAt = now;
      if (wheelLocked) return;

      wheelAccum += delta;
      if (Math.abs(wheelAccum) < 40) return;

      const index = currentSlideIndex();
      const next = wheelAccum > 0 ? Math.min(index + 1, slides.length - 1) : Math.max(index - 1, 0);
      wheelAccum = 0;
      wheelLocked = true;
      lockedAt = now;
      if (next !== index) goToSlide(slides[next]);
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
        if (!entry.isIntersecting) entry.target.scrollTop = 0; // always re-enter a slide at its top

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

  // Keep the current slide aligned if the viewport is resized.
  // Width-only: phones fire resize when the browser bar shows/hides, which must not re-snap.
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
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
  setupMasterDetail("work-index", "work-scroller");
  setupMasterDetail("experience-index", "experience-container");
  setupProgressBar();
  setupThemeToggle();
  setupImageWheel();
});
