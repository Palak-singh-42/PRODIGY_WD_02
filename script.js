let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function timeToString(time) {
  const ms = Math.floor((time % 1000) / 10);
  const secs = Math.floor((time / 1000) % 60);
  const mins = Math.floor((time / 60000) % 60);
  const hrs = Math.floor(time / 3600000);

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 2)}`;
}

function pad(number, digits = 2) {
  return number.toString().padStart(digits, '0');
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = timeToString(elapsedTime);
    }, 10);
    isRunning = true;
  }
}

function pause() {
  clearInterval(timerInterval);
  isRunning = false;
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00.00";
  elapsedTime = 0;
  isRunning = false;
  laps.innerHTML = "";
  lapCount = 1;
}

function lap() {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount++}: ${timeToString(elapsedTime)}`;
    laps.appendChild(li);
  }
}

// Theme toggle
document.getElementById("toggleTheme").addEventListener("change", function () {
  const container = document.querySelector(".stopwatch-container");
  document.body.style.background = this.checked
    ? "linear-gradient(to right, #232526, #414345)"
    : "linear-gradient(to right, #a1c4fd, #c2e9fb)";
  container.classList.toggle("dark", this.checked);
});
