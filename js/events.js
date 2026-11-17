/* Events page: calendar date-picker + topic filter + event list */

const today = new Date(); today.setHours(0, 0, 0, 0);
let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = null;
let activeCategory = "all";

const calBody = document.getElementById("cal-body");
const calTitle = document.getElementById("cal-title");
const list = document.getElementById("event-list");
const listTitle = document.getElementById("list-title");
const clearBtn = document.getElementById("show-all");

function filteredEvents() {
  return EVENTS
    .filter(e => activeCategory === "all" || e.category === activeCategory)
    .sort((a, b) => a.date - b.date);
}

/* ---------- Topic filter ---------- */
function renderChips() {
  const all = `<button type="button" class="chip" data-cat="all" aria-pressed="${activeCategory === "all"}">All topics</button>`;
  document.getElementById("chips").innerHTML = all + SERVICE_CATEGORIES.map(c =>
    `<button type="button" class="chip" data-cat="${c.id}" style="${tintStyle(c)}" aria-pressed="${c.id === activeCategory}">${icon(c.icon)}${c.name}</button>`
  ).join("");
}

document.getElementById("chips").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  activeCategory = chip.dataset.cat;
  renderChips();
  renderCalendar();
  renderList();
  document.querySelector(`.chip[data-cat="${activeCategory}"]`).focus();
});

/* ---------- Calendar ---------- */
function renderCalendar() {
  calTitle.textContent = `${MONTHS[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`;
  const events = filteredEvents();
  const startOffset = (viewMonth.getDay() + 6) % 7; // weeks start on Monday
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();

  let html = "<tr>";
  for (let i = 0; i < startOffset; i++) html += "<td></td>";
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d);
    const count = events.filter(e => sameDay(e.date, date)).length;
    const isToday = sameDay(date, today);
    const cls = ["cal-day", count ? "has-events" : "", isToday ? "today" : ""].join(" ");
    const label = `${formatDate(date)}, ${count ? `${count} event${count > 1 ? "s" : ""}` : "no events"}${isToday ? ", today" : ""}`;
    const pressed = !!(selectedDate && sameDay(date, selectedDate));
    html += `<td><button type="button" class="${cls}" data-date="${isoDate(date)}" aria-label="${label}" aria-pressed="${pressed}" ${date < today ? "disabled" : ""}>${d}</button></td>`;
    if ((startOffset + d) % 7 === 0 && d !== daysInMonth) html += "</tr><tr>";
  }
  calBody.innerHTML = html + "</tr>";

  document.getElementById("prev-month").disabled =
    viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() === today.getMonth();
}

function parseIso(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

calBody.addEventListener("click", e => {
  const btn = e.target.closest(".cal-day");
  if (!btn || btn.disabled) return;
  const iso = btn.dataset.date;
  selectedDate = selectedDate && isoDate(selectedDate) === iso ? null : parseIso(iso); // click again to clear
  renderCalendar();
  renderList();
  calBody.querySelector(`[data-date="${iso}"]`).focus();
});

// Arrow keys move between days
calBody.addEventListener("keydown", e => {
  const all = [...calBody.querySelectorAll(".cal-day")];
  const i = all.indexOf(document.activeElement);
  const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
  if (i === -1 || !step) return;
  e.preventDefault();
  const next = all[i + step];
  if (next && !next.disabled) next.focus();
});

document.getElementById("prev-month").addEventListener("click", () => { viewMonth.setMonth(viewMonth.getMonth() - 1); renderCalendar(); });
document.getElementById("next-month").addEventListener("click", () => { viewMonth.setMonth(viewMonth.getMonth() + 1); renderCalendar(); });
clearBtn.addEventListener("click", () => { selectedDate = null; renderCalendar(); renderList(); listTitle.focus(); });

/* ---------- Event list ---------- */
function renderList() {
  let events = filteredEvents();
  const cat = activeCategory === "all" ? null : categoryById(activeCategory);

  if (selectedDate) {
    events = events.filter(e => sameDay(e.date, selectedDate));
    listTitle.textContent = formatDate(selectedDate);
  } else {
    listTitle.textContent = cat ? cat.name : "All upcoming events";
  }
  clearBtn.hidden = !selectedDate;
  document.getElementById("event-count").textContent =
    `${events.length} event${events.length === 1 ? "" : "s"}${selectedDate && cat ? ` in ${cat.name}` : ""}`;

  list.innerHTML = events.length
    ? events.map(e => eventCardHtml(e)).join("")
    : `<div class="empty-state"><p><strong>Nothing on this day${cat ? " for this topic" : ""}.</strong></p><p>Dates with a dot have events. <button type="button" class="link-btn" data-clear>Show all upcoming events</button></p></div>`;
}

list.addEventListener("click", e => { if (e.target.closest("[data-clear]")) clearBtn.click(); });
listTitle.tabIndex = -1;

renderChips();
renderCalendar();
renderList();
