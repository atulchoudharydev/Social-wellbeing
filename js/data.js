/* =========================================================
   Sample content for the prototype.
   In a real build this would come from a CMS / API.
   ========================================================= */

const SERVICE_CATEGORIES = [
  {
    id: "mental-health",
    img: "images/mental-health.jpg",
    imgAlt: "A small group talking together in a comfortable living room",
    name: "Mental health & wellbeing",
    icon: "chat", tint: "#dceafc", ink: "#1d4f8c",
    summary: "Talking therapies, peer support and drop-in sessions for anyone feeling low, anxious or stressed.",
    services: [
      { name: "Talking Space drop-in", desc: "Free, confidential chats with a trained wellbeing practitioner. No appointment needed.", when: "Mon & Thu, 10am–1pm", cost: "Free", access: "Wheelchair accessible, quiet room available" },
      { name: "Anxiety management course", desc: "A 6-week group course teaching practical ways to manage worry and panic.", when: "Wednesdays, 6pm–7:30pm", cost: "Free (referral or self-referral)", access: "Online option available" },
      { name: "Peer support circle", desc: "Meet others with lived experience in a relaxed, friendly setting.", when: "Fridays, 2pm–3:30pm", cost: "Free", access: "Hearing loop installed" }
    ]
  },
  {
    id: "physical-activity",
    img: "images/physical-activity.jpg",
    imgAlt: "A group of people walking together along a sunny park path",
    name: "Physical activity",
    icon: "activity", tint: "#d6f2e1", ink: "#16683b",
    summary: "Gentle exercise, walking groups and classes for all fitness levels and ages.",
    services: [
      { name: "Health walks", desc: "Led 45-minute walks around the riverside park at a comfortable pace.", when: "Tue & Sat, 10am", cost: "Free", access: "Step-free routes, benches every 400m" },
      { name: "Chair-based exercise", desc: "Seated strength and mobility class, ideal for older adults or limited mobility.", when: "Thursdays, 11am", cost: "£2 per session", access: "Wheelchair accessible" },
      { name: "Family fitness Saturdays", desc: "Fun games and activities for parents and children aged 4–12.", when: "Saturdays, 1pm–2:30pm", cost: "Free", access: "Changing facilities, buggy parking" }
    ]
  },
  {
    id: "family-support",
    img: "images/family-support.jpg",
    imgAlt: "A smiling dad playing with his laughing toddler",
    name: "Family & parenting support",
    icon: "users", tint: "#ffe4d6", ink: "#9a3a10",
    summary: "Help for parents, carers and young people, from baby groups to teenage support.",
    services: [
      { name: "Stay & play", desc: "Relaxed play session for under-5s and their parents or carers.", when: "Mon–Fri, 9:30am–11:30am", cost: "Free", access: "Baby changing, step-free" },
      { name: "Parenting advice clinic", desc: "One-to-one support with a family support worker.", when: "By appointment", cost: "Free", access: "Interpreters available on request" },
      { name: "Young carers group", desc: "A space for young people who look after a family member.", when: "Tuesdays, 4pm–5:30pm", cost: "Free", access: "Transport can be arranged" }
    ]
  },
  {
    id: "money-housing",
    img: "images/money-housing.jpg",
    imgAlt: "Two women talking through paperwork at a laptop",
    name: "Money, housing & advice",
    icon: "home", tint: "#ebe3fc", ink: "#4e3593",
    summary: "Free, impartial advice on benefits, debt, energy bills and housing issues.",
    services: [
      { name: "Benefits & debt advice", desc: "Speak to a trained adviser about benefits, budgeting and debt.", when: "Tue & Thu, 9am–4pm", cost: "Free", access: "Phone appointments available" },
      { name: "Warm Space & energy help", desc: "A warm, welcoming room plus advice on reducing energy bills.", when: "Daily, 10am–4pm (Nov–Mar)", cost: "Free, hot drinks provided", access: "Wheelchair accessible" }
    ]
  },
  {
    id: "older-people",
    img: "images/older-people.jpg",
    imgAlt: "Older residents laughing together at a social group",
    name: "Older people & social connection",
    icon: "cup", tint: "#ffefbf", ink: "#715000",
    summary: "Activities and friendship groups to reduce loneliness and keep people connected.",
    services: [
      { name: "Friendship café", desc: "Tea, cake and conversation. A great way to meet new people.", when: "Wednesdays, 2pm–4pm", cost: "Free", access: "Large-print menus, hearing loop" },
      { name: "Digital skills help", desc: "Friendly volunteers help you use phones, tablets and online services.", when: "Mondays, 1pm–3pm", cost: "Free", access: "Devices available to borrow" }
    ]
  },
  {
    id: "healthy-living",
    img: "images/healthy-living.jpg",
    imgAlt: "A woman cooking a pan of colourful vegetables",
    name: "Healthy living",
    icon: "heart", tint: "#fde0e5", ink: "#9b1f3a",
    summary: "Support to eat well, stop smoking, drink less and manage long-term conditions.",
    services: [
      { name: "Stop smoking service", desc: "Free 12-week programme with nicotine replacement and weekly support.", when: "By appointment", cost: "Free", access: "Telephone support available" },
      { name: "Cook & eat well", desc: "Learn to cook simple, healthy meals on a budget.", when: "Thursdays, 6pm–8pm", cost: "Free, ingredients included", access: "Step-free kitchen" }
    ]
  }
];

/* Events are generated relative to today so the calendar always
   shows upcoming activities whenever the prototype is opened. */
function daysFromToday(n) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

const EVENTS = [
  { id: "e1", title: "Mindfulness for beginners", category: "mental-health", offset: 1, time: "10:00 – 11:30", location: "Room 2, Wellbeing Hub", spaces: 8, capacity: 15, desc: "A gentle introduction to mindfulness with simple breathing and grounding techniques." },
  { id: "e2", title: "Health walk: Riverside loop", category: "physical-activity", offset: 2, time: "10:00 – 10:45", location: "Meet at Hub main entrance", spaces: 20, capacity: 25, desc: "A friendly, led walk at a comfortable pace. Suitable for all abilities." },
  { id: "e3", title: "Baby massage workshop", category: "family-support", offset: 3, time: "13:30 – 14:30", location: "Family Room", spaces: 2, capacity: 10, desc: "Learn soothing massage techniques to help you bond with your baby (0–12 months)." },
  { id: "e4", title: "Managing money in winter", category: "money-housing", offset: 5, time: "18:00 – 19:00", location: "Main Hall & online", spaces: 30, capacity: 40, desc: "Practical tips on budgeting, energy bills and the support you may be entitled to." },
  { id: "e5", title: "Friendship café: Games afternoon", category: "older-people", offset: 6, time: "14:00 – 16:00", location: "Community Café", spaces: 12, capacity: 30, desc: "Board games, quizzes and a cuppa. Everyone welcome, especially newcomers!" },
  { id: "e6", title: "Chair yoga", category: "physical-activity", offset: 8, time: "11:00 – 12:00", location: "Studio", spaces: 5, capacity: 12, desc: "Seated yoga to improve flexibility and relaxation. No experience needed." },
  { id: "e7", title: "Cook & eat well: Soups", category: "healthy-living", offset: 9, time: "18:00 – 20:00", location: "Community Kitchen", spaces: 0, capacity: 10, desc: "Make three warming, budget-friendly soups and take some home." },
  { id: "e8", title: "Coping with stress workshop", category: "mental-health", offset: 12, time: "18:30 – 20:00", location: "Room 2, Wellbeing Hub", spaces: 14, capacity: 20, desc: "Understand what stress does to the body and learn practical ways to cope." },
  { id: "e9", title: "Family fun fitness", category: "physical-activity", offset: 13, time: "13:00 – 14:30", location: "Sports Hall", spaces: 18, capacity: 30, desc: "Games and activities for parents and children aged 4–12." },
  { id: "e10", title: "Digital skills: Video calls", category: "older-people", offset: 15, time: "13:00 – 15:00", location: "IT Suite", spaces: 6, capacity: 8, desc: "Learn how to video call family and friends on a phone or tablet." },
  { id: "e11", title: "Young carers games night", category: "family-support", offset: 19, time: "16:00 – 18:00", location: "Youth Room", spaces: 10, capacity: 16, desc: "Pizza, games and a chance to relax with others who understand." },
  { id: "e12", title: "Community wellbeing fair", category: "healthy-living", offset: 22, time: "10:00 – 15:00", location: "Main Hall", spaces: 150, capacity: 200, desc: "Meet local services, try free health checks and enjoy taster sessions." },
  { id: "e13", title: "Men's mental health talk", category: "mental-health", offset: 26, time: "19:00 – 20:30", location: "Main Hall", spaces: 25, capacity: 40, desc: "An open, relaxed conversation about men's mental health, with guest speakers." },
  { id: "e14", title: "Stop smoking drop-in", category: "healthy-living", offset: 33, time: "12:00 – 14:00", location: "Clinic Room", spaces: 9, capacity: 12, desc: "Find out about free support to quit and get a carbon monoxide check." }
].map(e => ({ ...e, date: daysFromToday(e.offset) }));

const NEWS = [
  {
    id: "n1", img: "images/story-walk.jpg", imgAlt: "People walking together on a park path at golden hour", type: "story", title: "How the walking group helped Margaret find her confidence again",
    date: daysFromToday(-4), summary: "After losing her husband, Margaret rarely left the house. A health walk changed that.",
    body: "Margaret, 74, joined our Tuesday health walk after a nudge from her GP. \"I was nervous the first time, but everyone was so welcoming,\" she says. Six months on, she walks three times a week, has made new friends and now volunteers as a walk 'buddy' for newcomers. Our health walks are free and open to everyone, with step-free routes and a slower-paced option.",
    quote: "I came for the walk, but I stayed for the people.", by: "Margaret, health walk member"
  },
  {
    id: "n2", img: "images/older-people.jpg", imgAlt: "Older residents laughing together at a social group", type: "news", title: "Warm Space opens for winter",
    date: daysFromToday(-7), summary: "Our Warm Space is now open daily from 10am to 4pm, with free hot drinks and energy advice.",
    body: "From this month, the Hub's community room is open as a Warm Space every day from 10am to 4pm. Drop in for a hot drink, a chat, free Wi-Fi and phone charging. Our money advisers are also on hand on Tuesdays and Thursdays to help with energy bills and benefits checks. No need to book; just come along."
  },
  {
    id: "n3", img: "images/story-dad.jpg", imgAlt: "A father kissing his smiling baby son", type: "story", title: "\"Stay & play gave us a lifeline\": a new dad's story",
    date: daysFromToday(-12), summary: "Sam moved to the area with a newborn and no local support network.",
    body: "Sam and his partner moved here two weeks before their daughter was born. \"We didn't know anyone. Stay & play gave us a reason to get out, and the staff pointed us to the parenting clinic when we were struggling with sleep.\" Sam now helps run a monthly dads' meet-up at the Hub.",
    quote: "It's the first place that felt like home here.", by: "Sam, parent"
  },
  {
    id: "n4", img: "images/news-paperwork.jpg", imgAlt: "A person filling in a form next to a calculator", type: "news", title: "New: book events online or by phone",
    date: daysFromToday(-15), summary: "You can now reserve places on workshops through our website in just a few steps.",
    body: "Following feedback from residents, you can now book places on our events online. The booking form takes around two minutes and works on phones, tablets and computers. Prefer to talk to someone? You can still book by phone on 0300 123 4567 or in person at reception."
  },
  {
    id: "n5", img: "images/news-volunteers.jpg", imgAlt: "A smiling volunteer holding a clipboard in a park", type: "news", title: "Volunteers wanted for the Friendship café",
    date: daysFromToday(-20), summary: "Could you spare two hours a week to help tackle loneliness in our community?",
    body: "We're looking for friendly volunteers to welcome guests, make drinks and chat at our Wednesday Friendship café. Full training is provided and no experience is needed. Get in touch through the Contact page to find out more."
  },
  {
    id: "n6", img: "images/story-student.jpg", imgAlt: "A young woman smiling at a table", type: "story", title: "Talking Space: \"I didn't feel judged\"",
    date: daysFromToday(-28), summary: "Priya shares how a drop-in session helped her through a difficult time at university.",
    body: "Priya, 21, visited Talking Space during exam season when her anxiety became overwhelming. \"I didn't need an appointment, and I didn't feel judged. They helped me make a plan and referred me to the anxiety course.\" She now recommends the Hub to her friends.",
    quote: "Just walking through the door was the hardest part, and it was worth it.", by: "Priya, student"
  }
];

function categoryById(id) {
  return SERVICE_CATEGORIES.find(c => c.id === id);
}
