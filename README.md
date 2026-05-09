# Modern Clocks

A collection of 2 distinct, fully functional clock UIs built with HTML, CSS, and JavaScript. Both clocks run on the browser's actual system time using JavaScript's `Date` API, update every second via `setInterval`, and use completely different visual designs. No external libraries, no build tools — open the files directly in a browser and the clock starts immediately showing your real current time.

---

## What This Project Does

This repository contains 2 clock implementations, each in its own folder. Both extract hours, minutes, and seconds from `new Date()` on every tick and update the UI accordingly. Each design is self-contained and demonstrates how the same real-time functionality can be expressed through different visual approaches.

---

## Clocks Included

### 1. First Clock — `First_Clock/`

An analog clock built using CSS transforms on HTML elements as clock hands.

- `setInterval(updateClock, 1000)` calls the update function every 1000ms; `updateClock()` is also called once immediately on load so there is no 1-second blank delay when the page opens
- On each tick, `new Date()` extracts `hours`, `minutes`, and `seconds` using `getHours()`, `getMinutes()`, and `getSeconds()`
- Each hand's rotation angle is calculated as a degree value and applied via `element.style.transform = 'rotate(Xdeg)'`

**Degree calculations:**

| Hand | Formula | Why |
|---|---|---|
| Hour | `(hours % 12) / 12 * 360 + (minutes / 60) * 30` | Moves gradually — 30° per hour + fractional movement per minute |
| Minute | `minutes / 60 * 360 + (seconds / 60) * 6` | Moves gradually — 6° per minute + fractional movement per second |
| Second | `seconds / 60 * 360` | Jumps 6° per second |

The hour and minute hands use fractional degree values, not just whole-hour/whole-minute jumps. If it's 3:30, the hour hand sits exactly halfway between 3 and 4.

- The clock face, tick marks, center dot, and hand elements are built entirely with HTML and CSS — no canvas, no SVG
- `transform-origin` is set to the pivot point of each hand (the center of the clock face) so rotation correctly sweeps around the center

---

### 2. Second Clock — `Second Clocks/`

A second clock with a different visual design — a distinct color scheme, hand shapes, face layout, or additional digital time display compared to the first.

- Uses the same `Date` API and `setInterval` architecture independently implemented in its own `script.js`
- Styled independently with its own `style.css` — the two clocks share no files
- Runs immediately on page open showing the real current system time

---

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Clock face structure, hand elements, tick mark divs, center dot |
| CSS3 | Hand sizing, `transform-origin` for pivot points, face styling, layout |
| JavaScript (Vanilla) | `Date` API for current time, `setInterval` 1-second loop, degree calculations, style updates |

---

## Project Structure

```
Modern_Clocks/
├── First_Clock/
│   ├── index.html       # Clock face layout with hand elements
│   ├── style.css        # Clock face, hands, tick marks, and all visual styling
│   └── script.js        # Date extraction, degree calculations, setInterval loop
├── Second Clocks/
│   ├── index.html       # Second clock layout
│   ├── style.css        # Independent visual styling for the second design
│   └── script.js        # Same core logic, independently implemented
└── README.md
```

---

## How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/tripathipawan/Modern_Clocks.git
   ```
2. Open `First_Clock/index.html` or `Second Clocks/index.html` directly in any modern browser — the clock starts immediately showing your system's real current time, no server required.

---

## Repository

[https://github.com/tripathipawan/Modern_Clocks](https://github.com/tripathipawan/Modern_Clocks)
