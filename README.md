# Riverside Community Wellbeing Hub: website prototype

**Module:** 505IT HCI and Web Development
**Assignment:** Designing and Prototyping a User-Centred Website Interface

A working, responsive and accessible prototype of a website for a (fictional) local-authority Community Wellbeing Hub. It is built with plain HTML, CSS and JavaScript, with no frameworks or build step.

---

## How to view the prototype

### Option 1: open the file (easiest)
1. Unzip the project folder.
2. Double-click **`index.html`**. It opens in your default web browser.

Every page works this way. An internet connection is only used to load the web fonts; without one the site falls back to system fonts.

### Option 2: local web server
From the project folder:

```bash
python -m http.server 5500
```

Then open <http://localhost:5500>.

### Viewing on different devices
Resize the browser window, or press **F12**, open device mode, and choose a phone or tablet size.

Tested in current Chrome and Edge at 375px (phone), 800px (tablet) and 1280px (desktop) widths.

---

## Where to start
- **`guide.html`**: prototype guide with a site map, tasks to try and accessibility checks. *Start here.*
- **`design-options.html`**: the three UI design options explored, and why Option C was chosen.
- **`evaluation.html`**: evaluation methods, design iterations, findings and the changes made, and accessibility results.

The links to these pages are also in the footer of every page.

## Pages and brief requirements

| Page | Requirement from the brief | Main UI patterns |
|---|---|---|
| `index.html` | Homepage introducing the hub | Image slider, upcoming events, topic cards, stories carousel |
| `services.html` | Service directory | Accordion, live search, jump links |
| `events.html` | Calendar / event listing | Calendar date picker, topic filters |
| `booking.html` | Booking / registration form | 4-step wizard with validation and review |
| `contact.html` | Contact Us / support page | Contact form, details, opening times, FAQs |
| `news.html` | Community news and success stories | Featured story, filters, article pop-up |

## Things to try
1. **Book a place:** click "Book a place", press Continue with nothing selected to see the error handling, then complete all 4 steps.
2. **Search services:** type "walk" or "debt" on the Services page.
3. **Filter events:** pick a date with a dot on the calendar, then a topic.
4. **Accessibility:** press **Tab** from the top of a page (skip link, visible focus), and open **Display** in the header for larger text or high contrast.
5. **Slider:** use the arrows and dots on the homepage slider, and the pause button.

## Technology
- **HTML5:** semantic landmarks, native `<dialog>` and `<details>`
- **CSS3:** custom properties (design tokens), Grid, Flexbox, media queries, `prefers-reduced-motion`
- **JavaScript (ES6):** no libraries
- **WAI-ARIA:** accordion, carousel, dialog and switch patterns
- **Testing:** axe-core 4.10 (WCAG 2.2 A/AA) gave 0 violations on all pages at desktop and phone widths

## Folder structure
```
index.html, services.html, events.html, booking.html,
news.html, contact.html            the six site pages
design-options.html                UI design options (design phase)
evaluation.html                    evaluation and iteration evidence
guide.html                         prototype guide for reviewers
css/style.css                      all styles and design tokens
js/data.js                         sample services, events and news
js/main.js                         icons, navigation, Display menu, helpers
js/services.js, events.js,
js/booking.js, slider.js           page features
images/                            photographs (credits in images/CREDITS.md)
```

## Limitations
- There is no back end. Bookings and messages show a confirmation but are not stored or sent.
- Event dates are generated relative to today, so the calendar always shows upcoming events.
- The organisation, people and stories are fictional. Photos are Unsplash stock images (see `images/CREDITS.md`).
