/* Multi-step (wizard) booking form with per-step validation and an error summary */

const form = document.getElementById("booking-form");
const panels = [...form.querySelectorAll(".step-panel")];
const trackItems = [...document.querySelectorAll(".progress-track li")];
const stepLabels = [...document.querySelectorAll(".progress-steps li")];
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const errorSummary = document.getElementById("error-summary");
const errorList = document.getElementById("error-list");
const TOTAL = panels.length;
let step = 1;

/* ---------- Step 1: event choices ---------- */
const filterCat = document.getElementById("filter-cat");
filterCat.innerHTML += SERVICE_CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
const preselected = new URLSearchParams(location.search).get("event");

function renderOptions() {
  const checked = form.querySelector('input[name="event"]:checked');
  const keep = checked ? checked.value : preselected;
  const events = EVENTS
    .filter(e => filterCat.value === "all" || e.category === filterCat.value)
    .sort((a, b) => a.date - b.date);

  document.getElementById("event-options").innerHTML = events.map((e, i) => `
    <label class="option-card">
      <input type="radio" name="event" value="${e.id}" id="${i === 0 ? "event-first" : "event-" + e.id}" ${e.spaces === 0 ? "disabled" : ""} ${e.id === keep ? "checked" : ""}>
      <span>
        <strong>${escapeHtml(e.title)}</strong>
        <span class="opt-meta">${formatDate(e.date)} · ${e.time} · ${e.location}</span><br>
        ${spacesText(e)}
      </span>
    </label>`).join("") || `<div class="empty-state"><p>No events for this topic right now.</p></div>`;
}
filterCat.addEventListener("change", renderOptions);
renderOptions();

/* ---------- Character counter ---------- */
const notes = document.getElementById("notes");
notes.addEventListener("input", () => {
  document.getElementById("notes-count").textContent = `${500 - notes.value.length} characters remaining`;
});

/* ---------- Validation ---------- */
function validate(n) {
  form.querySelectorAll(".has-error").forEach(g => g.classList.remove("has-error"));
  const errors = [];
  const fail = (groupId, fieldId, errId, message) => {
    document.getElementById(groupId).classList.add("has-error");
    document.getElementById(errId).textContent = message;
    errors.push({ fieldId, message });
  };

  if (n === 1) {
    const chosen = form.querySelector('input[name="event"]:checked');
    if (!chosen) {
      const first = form.querySelector('input[name="event"]:not(:disabled)');
      fail("group-event", first ? first.id : "filter-cat", "err-event", "Select an event");
    } else {
      const ev = EVENTS.find(e => e.id === chosen.value);
      if (+document.getElementById("tickets").value > ev.spaces)
        fail("group-tickets", "tickets", "err-tickets", `There ${ev.spaces === 1 ? "is" : "are"} only ${ev.spaces} place${ev.spaces === 1 ? "" : "s"} left on this event`);
    }
  }
  if (n === 2) {
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.replace(/\s+/g, "");
    if (name.length < 2) fail("group-name", "fullname", "err-name", "Enter your full name");
    if (!email) fail("group-email", "email", "err-email", "Enter your email address");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fail("group-email", "email", "err-email", "Enter an email address in the correct format, like name@example.com");
    if (phone && !/^(\+44|0)\d{9,10}$/.test(phone)) fail("group-phone", "phone", "err-phone", "Enter a UK phone number, like 07700 900123");
  }
  if (n === 4 && !document.getElementById("consent").checked) {
    fail("group-consent", "consent", "err-consent", "Agree to us storing your details so we can confirm your booking");
  }

  if (errors.length) {
    errorList.innerHTML = errors.map(e => `<li><a href="#${e.fieldId}">${e.message}</a></li>`).join("");
    errorSummary.classList.add("show");
    errorSummary.focus();
    return false;
  }
  errorSummary.classList.remove("show");
  return true;
}

errorList.addEventListener("click", e => {
  const a = e.target.closest("a");
  if (!a) return;
  e.preventDefault();
  const field = document.getElementById(a.getAttribute("href").slice(1));
  if (field) { field.focus(); field.scrollIntoView({ block: "center" }); }
});

/* ---------- Review step ---------- */
function selectedEvent() {
  const c = form.querySelector('input[name="event"]:checked');
  return c && EVENTS.find(e => e.id === c.value);
}

function buildSummary() {
  const ev = selectedEvent();
  const needs = [...form.querySelectorAll('input[name="needs"]:checked')].map(c => c.value);
  const val = id => escapeHtml(document.getElementById(id).value.trim());
  const rows = [
    ["Event", escapeHtml(ev.title), 1],
    ["When", `${formatDate(ev.date, { year: true })}, ${ev.time}`, 1],
    ["Where", ev.location, 1],
    ["Places", document.getElementById("tickets").value, 1],
    ["Name", val("fullname"), 2],
    ["Email", val("email"), 2],
    ["Phone", val("phone") || "Not given", 2],
    ["Contact by", form.querySelector('input[name="contact-pref"]:checked').value, 2],
    ["Access needs", needs.length ? needs.join(", ") : "None", 3],
    ["Language", val("language"), 3]
  ];
  document.getElementById("summary").innerHTML = rows.map(([k, v, s]) => `
    <div class="summary-row">
      <dt>${k}</dt><dd>${v}</dd>
      <button type="button" class="link-btn" data-goto="${s}">Change<span class="visually-hidden"> ${k.toLowerCase()}</span></button>
    </div>`).join("");
}

document.getElementById("summary").addEventListener("click", e => {
  const b = e.target.closest("[data-goto]");
  if (b) goTo(+b.dataset.goto);
});

/* ---------- Step navigation ---------- */
function goTo(n, moveFocus = true) {
  step = n;
  panels.forEach(p => { p.hidden = +p.dataset.step !== n; });
  trackItems.forEach((li, i) => { li.className = i + 1 < n ? "done" : i + 1 === n ? "current" : ""; });
  stepLabels.forEach((li, i) => {
    li.classList.toggle("current", i + 1 === n);
    if (i + 1 === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
  });
  document.getElementById("progress-text").textContent = `Step ${n} of ${TOTAL}`;
  document.getElementById("progress-name").textContent = panels[n - 1].dataset.name;
  backBtn.hidden = n === 1;
  nextBtn.textContent = n === TOTAL ? "Confirm booking" : "Continue";
  if (n === TOTAL) buildSummary();
  errorSummary.classList.remove("show");
  document.title = `Step ${n} of ${TOTAL}: ${panels[n - 1].dataset.name} | Riverside Wellbeing Hub`;
  if (moveFocus) {
    const h = panels[n - 1].querySelector("h2");
    h.focus();
    document.getElementById("progress").scrollIntoView({ block: "start" });
  }
}

backBtn.addEventListener("click", () => goTo(step - 1));

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!validate(step)) return;
  if (step < TOTAL) return goTo(step + 1);

  // Prototype: no server, so simulate a successful booking
  const ev = selectedEvent();
  const places = +document.getElementById("tickets").value;
  ev.spaces -= places;
  form.hidden = true;
  document.getElementById("progress").hidden = true;
  document.getElementById("confirmation").hidden = false;
  document.getElementById("ref").textContent = "RWH-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const first = escapeHtml(document.getElementById("fullname").value.trim().split(" ")[0]);
  document.getElementById("confirm-text").innerHTML =
    `Thank you, ${first}. You have <strong>${places} place${places > 1 ? "s" : ""}</strong> at <strong>${escapeHtml(ev.title)}</strong> on ${formatDate(ev.date, { year: true })} at ${ev.time.split(" ")[0]}, ${ev.location}. We've sent a confirmation to ${escapeHtml(document.getElementById("email").value.trim())}.`;
  document.title = "Booking confirmed | Riverside Wellbeing Hub";
  document.getElementById("confirm-title").focus();
});

goTo(1, false);
