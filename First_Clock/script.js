// DOM Elements
const clockFace = document.getElementById('clock-face');
const digitalTime = document.getElementById('digital-time');
const digitalDate = document.getElementById('digital-date');
const themeToggle = document.getElementById('theme-toggle');
const smoothToggle = document.getElementById('smooth-toggle');
const timezoneDisplay = document.getElementById('timezone');

// State variables
let smoothMotion = true;
let pulseEnabled = true;

// Create hour marks and numbers
function createHourMarks() {
  // Clear any existing content
  clockFace.innerHTML = '';

  // Create hour marks (60 marks for each minute)
  for (let i = 0; i < 60; i++) {
    const mark = document.createElement('div');
    const angle = i * 6; // 6 degrees per minute mark

    // Determine if it's a main hour mark (every 5th mark)
    if (i % 5 === 0) {
      mark.className = 'hour-mark main';

      // Add hour numbers (1-12)
      const hourNumber = document.createElement('div');
      hourNumber.className = 'hour-number';

      // Calculate position for hour numbers
      const hourValue = i === 0 ? 12 : i / 5;
      const radius = 42; // Percentage from center
      const angleRad = (angle - 90) * (Math.PI / 180); // Convert to radians, offset by -90°

      const x = 50 + radius * Math.cos(angleRad);
      const y = 50 + radius * Math.sin(angleRad);

      hourNumber.textContent = hourValue;
      hourNumber.style.left = `${x}%`;
      hourNumber.style.top = `${y}%`;
      hourNumber.style.transform = 'translate(-50%, -50%)';

      clockFace.appendChild(hourNumber);
    } else {
      mark.className = 'hour-mark';
    }

    mark.style.transform = `translateX(-50%) rotate(${angle}deg) translateY(10px)`;

    clockFace.appendChild(mark);
  }

  // Create center dot
  const centerDot = document.createElement('div');
  centerDot.className = 'center-dot';
  centerDot.id = 'center-dot';
  clockFace.appendChild(centerDot);

  // Create clock hands
  createClockHand('hour-hand');
  createClockHand('minute-hand');
  createClockHand('second-hand');
}

function createClockHand(className) {
  const hand = document.createElement('div');
  hand.className = className;
  clockFace.appendChild(hand);
}

// Update clock
function updateClock() {
  const now = new Date();

  // Get time components
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Calculate angles for smooth motion if enabled
  const secondAngle = smoothMotion ?
    (seconds + milliseconds / 1000) * 6 : // 6 degrees per second
    seconds * 6;

  const minuteAngle = smoothMotion ?
    (minutes + seconds / 60) * 6 : // 6 degrees per minute
    minutes * 6;

  const hourAngle = smoothMotion ?
    (hours % 12 + minutes / 60) * 30 : // 30 degrees per hour
    (hours % 12) * 30;

  // Update clock hands
  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');

  if (hourHand) {
    hourHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${hourAngle}deg)`;
  }

  if (minuteHand) {
    minuteHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${minuteAngle}deg)`;
  }

  if (secondHand) {
    secondHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${secondAngle}deg)`;
  }

  // Update digital clock
  const timeString =
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');

  digitalTime.textContent = timeString;

  // Update date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  digitalDate.textContent = now.toLocaleDateString('en-US', options);

  // Update timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timezoneDisplay.textContent = timezone;
}

// Toggle theme
function toggleTheme() {
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  if (body.classList.contains('theme-dark')) {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Toggle Theme';
  } else {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
  }
}

// Toggle smooth motion
function toggleSmoothMotion() {
  smoothMotion = !smoothMotion;

  if (smoothMotion) {
    smoothToggle.innerHTML = '<i class="fas fa-wave-square"></i> Smooth Motion: ON';
  } else {
    smoothToggle.innerHTML = '<i class="fas fa-square"></i> Smooth Motion: OFF';
  }
}

// Initialize the clock
function init() {
  createHourMarks();

  // Add pulse animation to center dot
  const centerDot = document.getElementById('center-dot');
  if (centerDot) {
    centerDot.classList.add('pulse');
  }

  // Set up event listeners
  themeToggle.addEventListener('click', toggleTheme);
  smoothToggle.addEventListener('click', toggleSmoothMotion);

  // Update clock immediately
  updateClock();

  // Update clock every 50ms for smooth motion
  setInterval(updateClock, 50);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);