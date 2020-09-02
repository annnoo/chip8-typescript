export class SoundOutput {
  audioCtx = new (window.AudioContext)();
  private oscillator: OscillatorNode = null;
  gain: GainNode;


  constructor() {
    this.gain = this.audioCtx.createGain();
    this.gain.gain.value = 0.05;
  }

  playNote(frequency: number) {
    // create Oscillator node
    if (!this.oscillator) {
      this.oscillator = this.audioCtx.createOscillator();
      this.oscillator.type = 'square';
      this.oscillator.frequency.value = frequency; // value in hertz
      this.gain.connect(this.audioCtx.destination);
      this.oscillator.connect(this.gain);

      this.oscillator.start(0);

    }

  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop(0);
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }


}