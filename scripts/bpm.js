const synth = new Tone.Synth().toDestination();

const blinkingBox = document.getElementById("blinkingBox");
const bpmSlider = document.getElementById("bpmSlider");
const bpmDisplay = document.getElementById("bpmDisplay");

let intervalId;
let bpm = 120;

function startMetronome() {
    const millisecondsPerBeat = 60000 / bpm;
    intervalId = setInterval(playBeat, millisecondsPerBeat);
}

function stopMetronome() {
    clearInterval(intervalId);
}

function playBeat() {
    synth.triggerAttackRelease("C4", "8n");
    console.log("beat！");
    blinkingBox.style.backgroundColor = "rgb(155, 200, 255)";
    setTimeout(() => {
        blinkingBox.style.backgroundColor = "rgb(0, 115, 255)";
    }, 100);
}

bpmSlider.addEventListener("input", () => {
    bpm = parseInt(bpmSlider.value);
    bpmDisplay.textContent = `BPM: ${bpm}`;
    clearInterval(intervalId);
    startMetronome();
});