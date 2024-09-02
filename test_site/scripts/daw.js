const synths = [
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
    }).toDestination(),
    new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 4,
        envelope: { attack: 0.01, decay: 0.4, sustain: 0.1, release: 1.4 }
    }).toDestination(),
    new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 },
        filter: { Q: 1, type: 'highpass', frequency: 10000 },
        filterEnvelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05, baseFrequency: 8000, octaves: -2.5 }
    }).toDestination()
];

synths[0].oscillator.type = 'square';
synths[1].oscillator.type = 'square';
synths[2].oscillator.type = 'square';
synths[3].oscillator.type = 'square';
synths[4].oscillator.type = 'square';
synths[5].oscillator.type = 'square';
synths[6].oscillator.type = 'square';
synths[7].oscillator.type = 'square';

const gain = new Tone.Gain(0.6);
gain.toDestination();

synths.forEach(synth => synth.connect(gain));

const $rows = document.body.querySelectorAll('.row'),
    notes = ['C4', 'B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3'];
let index = 0;

Tone.Transport.scheduleRepeat(repeat, '8n');

function repeat(time) {
    let step = index % 32;
    for (let i = 0; i < $rows.length; i++) {
        let synth = synths[i],
            note = notes[i],
            $row = $rows[i],
            $input = $row.querySelector(`input:nth-of-type(${step + 1})`);
        if ($input.checked) {
            if (i === 8) {
                synth.triggerAttackRelease('8n', time);
            } else if (i === 9) {
                synth.triggerAttackRelease('C2', '8n', time);
            } else if (i === 10) {
                synth.triggerAttackRelease('8n', time);
            } else {
                synth.triggerAttackRelease(note, '8n', time);
            }
        }
    }
    index++;
    updateProgressBar();
}

function toggleCheckbox(id) {
    const checkbox = document.getElementById(id);
    checkbox.checked = !checkbox.checked;
    const key = checkbox.nextElementSibling;
    if (checkbox.checked) {
        key.classList.add('checked');
    } else {
        key.classList.remove('checked');
    }
}

let isPlaying = false;

document.querySelector('#play').addEventListener('click', async () => {
    const playButton = document.querySelector('#play');
    if (isPlaying) {
        Tone.Transport.stop();
        Tone.Transport.position = 0;
        index = 0;
        playButton.textContent = 'Play';
        playButton.classList.remove('playing');
        updateProgressBar();
    } else {
        await Tone.start();
        Tone.Transport.start();
        playButton.textContent = 'Stop';
        playButton.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

function updateProgressBar() {
    const progressBar = document.getElementById('progress_bar');
    progressBar.value = (index % 32) / 32 * 100;
}




