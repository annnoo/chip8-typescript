export class SoundOutput {
  audioCtx = new (window.AudioContext)();
  notes = [
    [659, 4],
    [659, 4],
    [659, 4],
    [523, 8],
    [0, 16],
    [783, 16],
    [659, 4],
    [523, 8],
    [0, 16],
    [783, 16],
    [659, 4],
    [0, 4],
    [987, 4],
    [987, 4],
    [987, 4],
    [1046, 8],
    [0, 16],
    [783, 16],
    [622, 4],
    [523, 8],
    [0, 16],
    [783, 16],
    [659, 4]
  ];
  tempo = 100;


  playMelody() {
    if (this.notes.length > 0) {
      var note = this.notes.pop();
      this.playNote(note[0], 1000 * 256 / (note[1] * this.tempo));
    }
  }

  playNote(frequency: number, duration: number) {
    // create Oscillator node
    var oscillator = this.audioCtx.createOscillator();

    oscillator.type = 'square';
    console.log("play")

    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(this.audioCtx.destination);
    oscillator.start();
    setTimeout(() => {

      oscillator.stop();
      this.playMelody()
      console.log("test")

    }, duration);
  }


}