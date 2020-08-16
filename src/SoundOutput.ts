export class SoundOutput {
  audioCtx = new (window.AudioContext)();


  playMelody() {
  }

  playNote(frequency: number, duration: number) {
    // create Oscillator node
    var oscillator = this.audioCtx.createOscillator();
    var gain = this.audioCtx.createGain();
    gain.gain.value = 0.3
    oscillator.type = 'square';
    console.log("play")

    oscillator.frequency.value = frequency; // value in hertz

    gain.connect(this.audioCtx.destination);
    oscillator.connect(gain);

    oscillator.start();
    setTimeout(() => {

      oscillator.stop();
    }, duration);
  }


}