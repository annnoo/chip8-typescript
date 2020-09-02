import { uint8 } from './Types';
import { initVram, SCREEN_WIDTH } from './VRam';

import { OPCODE_MAP, BasicOpcodes } from './Opcodes'
import { START } from './Util'
import { NotImplementedError } from './NotImplementedError';
import { Chip8SoundOutput } from './Sound/Chip8SoundOutput';

const PROGRAM_START = 0x200;
const FONT = [
  0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
  0x20, 0x60, 0x20, 0x20, 0x70, // 1
  0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
  0x90, 0x90, 0xF0, 0x10, 0x10, // 4
  0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
  0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
  0xF0, 0x10, 0x20, 0x40, 0x40, // 7
  0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
  0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
  0xF0, 0x90, 0xF0, 0x90, 0x90, // A
  0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
  0xF0, 0x80, 0x80, 0x80, 0xF0, // C
  0xE0, 0x90, 0x90, 0x90, 0xE0, // D
  0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
  0xF0, 0x80, 0xF0, 0x80, 0x80  // F
]
export class Chip8 {

  // Doe not use VF 
  v = new Uint8Array(16);

  ram = new Uint8Array(4096);
  vram = initVram();


  // used For storing memory address
  i = 0;

  soundTimer: number;
  delayTimer: number;

  opcodes = BasicOpcodes

  programCounter: number = PROGRAM_START;
  stackPointer = 0;
  stack: number[] = [];

  paused = false;

  keys: number[] = [];
  soundOutput: IChip8SoundOutput;

  constructor(soundOutput: IChip8SoundOutput) {
    this.loadFont();
    this.soundOutput = soundOutput;
  }

  step() {
    const opcode = this.fetchOpcode();
    this.programCounter += 2
    this.execute(opcode);
    this.playSound();
  }
  playSound() {
    if (this.soundTimer > 0) {
      this.soundOutput.playBeep();
    }
    else {
      this.soundOutput.stopBeep()
    }
  }

  execute(opcode: number) {
    const maskedOpcode = START(opcode)
    const opcodeFunction = this.opcodes[maskedOpcode];
    if (opcodeFunction) {
      opcodeFunction(this, opcode);

    }
    else {
      this.paused = true;
      throw new NotImplementedError(opcode)
    }

  }

  loadProgram(data: Uint8Array) {
    data.forEach((value, index) => {
      this.ram[PROGRAM_START + index] = value
    });
  }
  reset() {
    this.i = 0;
    this.v = new Uint8Array(16);
    this.ram = new Uint8Array(4096);
    this.loadFont();
    this.stack = [];
    this.stackPointer = 0;
    this.programCounter = PROGRAM_START;

    this.vram = initVram();
  }

  loadFont() {
    FONT.forEach((value, index) => {
      this.ram[index] = value;
    })
  }

  fetchOpcode() {
    return this.ram[this.programCounter] << 8 | this.ram[this.programCounter + 1];
  }

  setPixel(x: number, y: number, value: boolean) {
    this.vram[y * SCREEN_WIDTH + x] = value;
  }




}