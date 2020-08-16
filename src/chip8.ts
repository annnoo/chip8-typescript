import { uint8 } from './Types';
import { initVram } from './VRam';

import { OPCODE_MAP, BasicOpcodes } from './Opcodes'
import { START } from './Util'

const PROGRAM_START = 0x200;

export class Chip8 {

  // Doe not use VF 
  v = new Uint8Array(16);

  ram = new Uint8Array(4096);
  vram = initVram();


  // used For storing memory address
  i: number;

  soundTimer: uint8;
  delayTimer: uint8;

  opcodes = BasicOpcodes

  programCounter: number = PROGRAM_START;
  stackPointer: number;
  stack: number[] = [];

  paused = false;

  constructor() {

  }

  step() {
    if (this.programCounter < PROGRAM_START + 40) {
      const opcode = this.fetchOpcode();
      this.programCounter += 2
      this.execute(opcode);
    }
  }

  execute(opcode: number) {
    const maskedOpcode = START(opcode)
    const opcodeFunction = this.opcodes[maskedOpcode];
    console.log(opcodeFunction);
    if (opcodeFunction) {
      opcodeFunction(this, opcode);
    }
    else {
      console.log(`${opcode.toString(16)} - Not implemented`);
    }
  }

  loadProgram(data: Uint8Array) {
    data.forEach((value, index) => {
      this.ram[PROGRAM_START + index] = value
      console.log(this.ram[PROGRAM_START + index]);
    });
  }

  fetchOpcode() {
    return this.ram[this.programCounter] << 8 | this.ram[this.programCounter + 1];
  }

  get vramFlattened() {
    return [].concat.apply([], this.vram);
  }


}