/* =========================================================
   Shared behaviour: icons, mobile nav, display settings,
   and helpers used by the page scripts.
   Header & footer are static HTML so navigation works
   even if JavaScript fails (progressive enhancement).
   ========================================================= */

/* ---------- Line icons (24px grid, stroke-based) ---------- */
const ICONS = {
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 1 1 21 11.5z"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  home: '<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  cup: '<path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><line x1="7" y1="2" x2="7" y2="4"/><line x1="11" y1="2" x2="11" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="17" rx="2"/><line x1="16" y1="2.5" x2="16" y2="6.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><polyline points="12 6.5 12 12 15.5 14"/>',
  pin: '<path d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>',
  "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/>',
  "chev-down": '<polyline points="6 9 12 15 18 9"/>',
  "chev-left": '<polyline points="15 18 9 12 15 6"/>',
  "chev-right": '<polyline points="9 18 15 12 9 6"/>',
  search: '<circle cx="11" cy="11" r="7.5"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><polyline points="21.5 6.5 12 13 2.5 6.5"/>',
  type: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  pause: '<rect x="6.5" y="5" width="3.5" height="14" rx="1"/><rect x="14" y="5" width="3.5" height="14" rx="1"/>',
  play: '<polygon points="7 4.5 19 12 7 19.5 7 4.5"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  ticket: '<path d="M3 8.5V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.5a3.5 3.5 0 0 0 0 7V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2.5a3.5 3.5 0 0 0 0-7z"/><line x1="14" y1="5" x2="14" y2="19" stroke-dasharray="2 2.5"/>',
  access: '<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5h14"/><path d="M12 8.5V14l-3.2 7"/><path d="M12 14l3.2 7"/>',
  info: '<circle cx="12" cy="12" r="9.5"/><line x1="12" y1="11" x2="12" y2="16.5"/><line x1="12" y1="7.5" x2="12.01" y2="7.5"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
};

function icon(name, extraClass = "") {
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
}

/* Replace <span data-icon="name"></span> placeholders in static HTML */
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(el => {
    el.outerHTML = icon(el.dataset.icon, el.className);
  });
}

/* ---------- Mobile navigation ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = open => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
    nav.classList.toggle("open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("open") && !document.querySelector(".a11y-panel:not([hidden])")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 1001px)").addEventListener("change", e => { if (e.matches) setOpen(false); });
}

/* ---------- Display settings (text size + high contrast) ---------- */
function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (err) { return null; }
}

// Apply saved preferences as early as possible
(function applySavedPrefs() {
  document.documentElement.style.setProperty("--font-scale", store("hub-font") || "1");
  if (store("hub-contrast") === "on") document.documentElement.classList.add("high-contrast");
})();

function initDisplayMenu() {
  const holder = document.querySelector("[data-a11y]");
  if (!holder) return;
  holder.innerHTML = `
    <button type="button" class="a11y-toggle" aria-expanded="false" aria-controls="a11y-panel">${icon("type")}Text size</button>
    <div class="a11y-panel" id="a11y-panel" role="group" aria-labelledby="a11y-title" hidden>
      <h2 id="a11y-title">Text size and contrast</h2>
      <fieldset>
        <legend>Text size</legend>
        <div class="seg">
          <button type="button" data-font="1" aria-label="Default text size">Aa</button>
          <button type="button" data-font="1.125" aria-label="Large text size">Aa</button>
          <button type="button" data-font="1.25" aria-label="Larger text size">Aa</button>
        </div>
      </fieldset>
      <div class="switch-row">
        <span id="contrast-label">High contrast</span>
        <button type="button" class="switch" role="switch" id="contrast-toggle" aria-checked="false" aria-labelledby="contrast-label"></button>
      </div>
    </div>`;

  const toggle = holder.querySelector(".a11y-toggle");
  const panel = holder.querySelector(".a11y-panel");
  const setOpen = open => { toggle.setAttribute("aria-expanded", String(open)); panel.hidden = !open; };
  toggle.addEventListener("click", () => setOpen(panel.hidden));
  document.addEventListener("click", e => { if (!holder.contains(e.target)) setOpen(false); });
  holder.addEventListener("keydown", e => { if (e.key === "Escape") { setOpen(false); toggle.focus(); } });

  const fontButtons = holder.querySelectorAll("[data-font]");
  const applyFont = scale => {
    document.documentElement.style.setProperty("--font-scale", scale);
    fontButtons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.font === String(scale))));
  };
  applyFont(store("hub-font") || "1");
  fontButtons.forEach(b => b.addEventListener("click", () => { applyFont(b.dataset.font); store("hub-font", b.dataset.font); }));

  const contrast = holder.querySelector("#contrast-toggle");
  const setContrast = on => {
    document.documentElement.classList.toggle("high-contrast", on);
    contrast.setAttribute("aria-checked", String(on));
  };
  setContrast(store("hub-contrast") === "on");
  contrast.addEventListener("click", () => {
    const on = contrast.getAttribute("aria-checked") !== "true";
    setContrast(on);
    store("hub-contrast", on ? "on" : "off");
  });
}

/* ---------- Helpers used by page scripts ---------- */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatDate(d, opts = {}) {
  const str = `${d.getDate()} ${MONTHS[d.getMonth()]}${opts.year ? " " + d.getFullYear() : ""}`;
  return opts.short ? str : `${DAYS[d.getDay()]} ${str}`;
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isoDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function tintStyle(cat) {
  return `--tint:${cat.tint};--tint-ink:${cat.ink}`;
}
function catPill(cat) {
  return `<span class="cat" style="${tintStyle(cat)}">${icon(cat.icon)}${cat.name}</span>`;
}

function spacesText(e) {
  if (e.spaces === 0) return `<span class="availability full">Fully booked</span>`;
  if (e.spaces <= 5) return `<span class="availability low">Only ${e.spaces} place${e.spaces === 1 ? "" : "s"} left</span>`;
  return `<span class="availability">${e.spaces} places left</span>`;
}

function eventCardHtml(e, { headingLevel = 3 } = {}) {
  const cat = categoryById(e.category);
  const h = `h${headingLevel}`;
  const action = e.spaces === 0
    ? `<span class="btn btn-sm" aria-disabled="true">Fully booked</span>`
    : `<a class="btn btn-primary btn-sm" href="booking.html?event=${e.id}">Book<span class="visually-hidden"> a place on ${escapeHtml(e.title)}</span></a>`;
  return `
    <article class="event">
      <div class="event-date" aria-hidden="true">
        <span class="dow">${DAYS[e.date.getDay()].slice(0, 3)}</span>
        <span class="day">${e.date.getDate()}</span>
        <span class="mon">${MONTHS[e.date.getMonth()].slice(0, 3)}</span>
      </div>
      <div class="event-main">
        ${catPill(cat)}
        <${h}>${escapeHtml(e.title)}</${h}>
        <p>${escapeHtml(e.desc)}</p>
        <ul class="facts">
          <li>${icon("calendar")}<time datetime="${isoDate(e.date)}">${formatDate(e.date)}</time></li>
          <li>${icon("clock")}<span><span class="visually-hidden">Time: </span>${e.time}</span></li>
          <li>${icon("pin")}<span><span class="visually-hidden">Location: </span>${e.location}</span></li>
        </ul>
      </div>
      <div class="event-side">
        ${spacesText(e)}
        ${action}
      </div>
    </article>`;
}

/* ---------- Boot ---------- */
hydrateIcons();
initNav();
initDisplayMenu();
