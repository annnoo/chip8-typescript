import { SoundOutput } from './SoundOutput';

export class Chip8SoundOutput implements IChip8SoundOutput {

  soundOutput = new SoundOutput()

  frequency = 200;

  playBeep() {
    this.soundOutput.playNote(this.frequency);
  }

  stopBeep() {
    this.soundOutput.stop();
  }
}