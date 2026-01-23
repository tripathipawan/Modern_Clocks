const numbersBox = document.getElementById("numbers");
const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");
const digital = document.getElementById("digital");
const dateText = document.getElementById("date");
const zoneLabel = document.getElementById("zoneLabel");
const clock = document.getElementById("clock");

let zone = "local";

/* Numbers */
for (let i = 1; i <= 12; i++) {
  const n = document.createElement("div");
  n.textContent = i;
  n.className = "absolute text-lg font-semibold";
  const a = i * 30 * Math.PI / 180;
  n.style.left = 160 + 135 * Math.sin(a) - 8 + "px";
  n.style.top = 160 - 135 * Math.cos(a) - 10 + "px";
  numbersBox.appendChild(n);
}

/* Timezone */
document.getElementById("zoneSelect").onchange = e => zone = e.target.value;

/* Themes */
document.getElementById("themeSelect").onchange = e => {
  clock.className = `clock relative w-80 h-80 rounded-full backdrop-blur-xl border border-[aqua] ${e.target.value}`;
};

function getTime() {
  return zone === "local"
    ? new Date()
    : new Date(new Date().toLocaleString("en-US", { timeZone: zone }));
}

/* Animation */
function animate() {
  const now = getTime();
  const ms = now.getMilliseconds();
  const s = now.getSeconds() + ms / 1000;
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;

  secondHand.style.transform = `rotate(${s * 6}deg)`;
  minuteHand.style.transform = `rotate(${m * 6}deg)`;
  hourHand.style.transform = `rotate(${h * 30}deg)`;

  digital.textContent = now.toLocaleTimeString();
  dateText.textContent = now.toDateString();
  zoneLabel.textContent = zone === "local" ? "Local Time" : zone;

  requestAnimationFrame(animate);
}
animate();