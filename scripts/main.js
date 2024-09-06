const synth = new Tone.Synth().toDestination();

const keys = document.querySelectorAll(".piano_key");

keys.forEach(key => {
    key.addEventListener("click", () => {
        const key_note = key.getAttribute("data-note");
        synth.triggerAttackRelease(key_note, "8n");
    });
});

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