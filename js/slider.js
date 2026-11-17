/* =========================================================
   Hero image slider + horizontal stories carousel.
   Follows the WAI-ARIA Authoring Practices carousel pattern:
   - Pause/play button (WCAG 2.2.2 Pause, Stop, Hide)
   - Auto-rotation stops on hover or keyboard focus
   - No auto-rotation when the user prefers reduced motion
   - Previous / next buttons and labelled slide pickers
   ========================================================= */

function initHeroSlider(root) {
  if (!root) return;
  const slides = [...root.querySelectorAll(".slide")];
  const dotsWrap = root.querySelector(".slider-dots");
  const playBtn = root.querySelector("[data-play]");
  const DELAY = 7000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer = null;
  let playing = !reduceMotion;   // user's setting
  let held = false;              // temporarily paused by hover / focus

  dotsWrap.innerHTML = slides.map((s, i) =>
    `<button type="button" class="slider-dot" aria-label="Show slide ${i + 1}: ${s.dataset.title}"><span></span></button>`
  ).join("");
  const dots = [...dotsWrap.children];

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      const active = n === current;
      s.classList.toggle("is-active", active);
      s.setAttribute("aria-hidden", String(!active));
      s.inert = !active; // hidden slides' links can't be tabbed to
    });
    dots.forEach((d, n) => d.setAttribute("aria-current", String(n === current)));
  }

  function schedule() {
    clearTimeout(timer);
    if (playing && !held) timer = setTimeout(() => { show(current + 1); schedule(); }, DELAY);
  }

  function setPlaying(on) {
    playing = on;
    playBtn.setAttribute("aria-label", on ? "Pause automatic slide show" : "Play automatic slide show");
    playBtn.innerHTML = icon(on ? "pause" : "play");
    // While rotating, announcements would interrupt screen-reader users, so only announce when paused
    root.querySelector(".slides").setAttribute("aria-live", on ? "off" : "polite");
    schedule();
  }

  root.querySelector("[data-prev]").addEventListener("click", () => { show(current - 1); schedule(); });
  root.querySelector("[data-next]").addEventListener("click", () => { show(current + 1); schedule(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { show(i); schedule(); }));
  playBtn.addEventListener("click", () => setPlaying(!playing));

  root.addEventListener("mouseenter", () => { held = true; schedule(); });
  root.addEventListener("mouseleave", () => { held = false; schedule(); });
  root.addEventListener("focusin", () => { held = true; schedule(); });
  root.addEventListener("focusout", e => { if (!root.contains(e.relatedTarget)) { held = false; schedule(); } });
  document.addEventListener("visibilitychange", () => { held = document.hidden; schedule(); });

  show(0);
  setPlaying(playing);
}

function initCarousel(root) {
  if (!root) return;
  const track = root.querySelector(".carousel-track");
  const prev = root.querySelector("[data-prev]");
  const next = root.querySelector("[data-next]");
  const smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const step = () => {
    const card = track.querySelector("li");
    return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
  };
  const update = () => {
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: smooth }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: smooth }));
  track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  window.addEventListener("resize", update);
  update();
}
