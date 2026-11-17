/* Service directory: accessible accordion (WAI-ARIA APG pattern) + live keyword filter */

const acc = document.getElementById("accordion");
const search = document.getElementById("service-search");
const countEl = document.getElementById("results-count");
const noResults = document.getElementById("no-results");

// Topic jump links (desktop sidebar)
document.getElementById("jump-list").innerHTML = SERVICE_CATEGORIES.map(c =>
  `<li><a href="#${c.id}" data-jump="${c.id}" style="${tintStyle(c)}">${icon(c.icon)}${c.name}</a></li>`
).join("");

function serviceHtml(s) {
  return `
    <li class="service">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <ul class="facts">
        <li>${icon("clock")}<span><span class="visually-hidden">When: </span>${s.when}</span></li>
        <li>${icon("ticket")}<span><span class="visually-hidden">Cost: </span>${s.cost}</span></li>
        <li>${icon("access")}<span><span class="visually-hidden">Accessibility: </span>${s.access}</span></li>
      </ul>
    </li>`;
}

function render(filter = "") {
  const q = filter.trim().toLowerCase();
  let total = 0;

  acc.innerHTML = SERVICE_CATEGORIES.map(cat => {
    const matches = cat.services.filter(s =>
      !q || `${cat.name} ${s.name} ${s.desc}`.toLowerCase().includes(q));
    if (!matches.length) return "";
    total += matches.length;
    const open = q !== "" || location.hash === "#" + cat.id;
    return `
      <div class="acc-item" id="${cat.id}">
        <h2>
          <button type="button" class="acc-trigger" id="trigger-${cat.id}" aria-expanded="${open}" aria-controls="panel-${cat.id}">
            <span class="tile-icon" style="${tintStyle(cat)}">${icon(cat.icon)}</span>
            <span class="acc-title">${cat.name}</span>
            <span class="acc-count">${matches.length} service${matches.length === 1 ? "" : "s"}</span>
            <span class="acc-chev">${icon("chev-down")}</span>
          </button>
        </h2>
        <div class="acc-panel" id="panel-${cat.id}" role="region" aria-labelledby="trigger-${cat.id}" ${open ? "" : "hidden"}>
          <div class="acc-intro">
            <img src="${cat.img}" alt="${cat.imgAlt}" loading="lazy" width="960" height="640">
            <p>${cat.summary}</p>
          </div>
          <ul class="service-list">${matches.map(serviceHtml).join("")}</ul>
        </div>
      </div>`;
  }).join("");

  noResults.hidden = total > 0;
  countEl.textContent = q
    ? `${total} service${total === 1 ? "" : "s"} found for “${filter.trim()}”`
    : `${total} services across ${SERVICE_CATEGORIES.length} topics`;
}

function setPanel(trigger, open) {
  trigger.setAttribute("aria-expanded", String(open));
  document.getElementById(trigger.getAttribute("aria-controls")).hidden = !open;
}

acc.addEventListener("click", e => {
  const t = e.target.closest(".acc-trigger");
  if (t) setPanel(t, t.getAttribute("aria-expanded") !== "true");
});

// Up/Down/Home/End move between accordion headers
acc.addEventListener("keydown", e => {
  const triggers = [...acc.querySelectorAll(".acc-trigger")];
  const i = triggers.indexOf(document.activeElement);
  if (i === -1) return;
  const target = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: triggers.length - 1 }[e.key];
  if (target === undefined) return;
  e.preventDefault();
  triggers[(target + triggers.length) % triggers.length].focus();
});

// Sidebar jump link opens the matching section
document.getElementById("jump-list").addEventListener("click", e => {
  const a = e.target.closest("[data-jump]");
  if (!a) return;
  const t = document.getElementById("trigger-" + a.dataset.jump);
  if (t) { setPanel(t, true); }
});

document.getElementById("expand-all").addEventListener("click", () =>
  acc.querySelectorAll(".acc-trigger").forEach(t => setPanel(t, true)));
document.getElementById("collapse-all").addEventListener("click", () =>
  acc.querySelectorAll(".acc-trigger").forEach(t => setPanel(t, false)));

let debounce;
search.addEventListener("input", () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => render(search.value), 200);
});

render();
if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target) {
    const go = () => target.scrollIntoView({ block: "start", behavior: "instant" });
    requestAnimationFrame(go);
    // re-align once web fonts and images have settled the layout
    if (document.readyState === "complete") setTimeout(go, 100);
    else window.addEventListener("load", () => setTimeout(go, 50), { once: true });
  }
}
