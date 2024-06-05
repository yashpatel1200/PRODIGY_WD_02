// script.js
let startTime, updatedTime, difference;
let isRunning = false;
let interval;
let laps = [];
let previousTime = '00:00:00';

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');
const previousTimeDisplay = document.getElementById('previousTime');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
    }
}

function resetStopwatch() {
    if (difference) {
        previousTime = `${formatTime(minutesDisplay.textContent)}:${formatTime(secondsDisplay.textContent)}:${formatTime(millisecondsDisplay.textContent)}`;
        updatePreviousTimeDisplay();
    }
    isRunning = false;
    clearInterval(interval);
    difference = 0;
    updateDisplay(0, 0, 0);
    laps = [];
    updateLaps();
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let milliseconds = parseInt((updatedTime % 1000) / 10);
    let seconds = parseInt((updatedTime / 1000) % 60);
    let minutes = parseInt((updatedTime / (1000 * 60)) % 60);
    updateDisplay(minutes, seconds, milliseconds);
}

function updateDisplay(minutes, seconds, milliseconds) {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function updatePreviousTimeDisplay() {
    previousTimeDisplay.textContent = previousTime;
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function recordLap() {
    let lapTime = `${formatTime(minutesDisplay.textContent)}:${formatTime(secondsDisplay.textContent)}:${formatTime(millisecondsDisplay.textContent)}`;
    laps.push(lapTime);
    updateLaps();
}

function updateLaps() {
    lapsList.innerHTML = laps.map(lap => `<li>${lap}</li>`).join('');
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (isRunning) {
            recordLap();
        } else {
            startStopwatch();
        }
    }
});
