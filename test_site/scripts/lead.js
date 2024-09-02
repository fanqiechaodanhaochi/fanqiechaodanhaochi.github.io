const synth = new Tone.Synth().toDestination();

const keys = document.querySelectorAll(".piano_key");

keys.forEach(key => {
    key.addEventListener("click", () => {
        const key_note = key.getAttribute("data-note");
        synth.triggerAttackRelease(key_note, "8n");
    });
});