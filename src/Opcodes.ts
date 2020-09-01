import { Chip8 } from './Chip8';
import { initVram, SCREEN_WIDTH, SCREEN_HEIGHT } from './VRam';
import { kk as KK, X, NNN, kk, N, Y } from './Util';

export type OpcodeFunction = (cpu: Chip8, opcode: number) => void

export interface OpcodeMap {
  [key: number]: OpcodeFunction;
}

export const BasicOpcodes: OpcodeMap = {
  0x0: _0x0_CLEAR_OR_RETURN,
  0x1: _0x1_JUMP,
  0x2: _0x2_CALL_SUBROUTINE,
  0x3: _0x3_SKIP_INSTRUCTION,
  0x4: _0x4_SKIP_INSTRUCTION,
  0x5: _0x5_SKIP_INSTRUCTION,
  0x6: _0x6_LOAD,
  0x7: _0x7_ADD_VX,
  0x9: _0x9_SKIP_INSTRUCTION,
  0xA: _0xA_SET_I,
  0xC: _0xC_RANDOM,
  0xD: _0xD_DRAW,
  0xE: _0xE_SKIP_IF_KEYPRESS,
  0xF: _0xF_MISC,
}

export function _0x0_CLEAR_OR_RETURN(cpu: Chip8, opcode: number) {

  switch (KK(opcode)) {
    // if last byte is E0, clear screen
    case 0xE0:
      _0x00E0_CLEAR_SCREEN(cpu, opcode);
      break;
    case 0xEE:
      // If last byte is EE, pop stack
      _0x00EE_POP_STACK(cpu, opcode);
      break;
    default:
      cpu.paused = true;
      throw new Error(`Not implemented: - 0x" + opcode.toString(16)`)
      break;
  }
}

export function _0x00E0_CLEAR_SCREEN(cpu: Chip8, opcode: number) {
  cpu.vram = initVram();
}
export function _0x00EE_POP_STACK(cpu: Chip8, opcode: number) {
  cpu.programCounter = cpu.stack.pop()

}

export function _0x1_JUMP(cpu: Chip8, opcode: number) {
  cpu.programCounter = NNN(opcode)
}


export function _0x2_CALL_SUBROUTINE(cpu: Chip8, opcode: number) {
  cpu.stack.push(cpu.programCounter);
  cpu.programCounter = NNN(opcode);
}

export function _0x3_SKIP_INSTRUCTION(cpu: Chip8, opcode: number) {
  const vx = cpu.v[X(opcode)];
  // If vX equals KK, skip instruction
  if (vx === KK(opcode)) {
    cpu.programCounter += 2;
  }
}
export function _0x4_SKIP_INSTRUCTION(cpu: Chip8, opcode: number) {
  const vx = cpu.v[X(opcode)];
  // If vX equals KK, skip instruction
  if (vx !== KK(opcode)) {
    cpu.programCounter += 2;
  }
}

export function _0x5_SKIP_INSTRUCTION(cpu: Chip8, opcode: number) {
  const vx = cpu.v[X(opcode)];
  const vy = cpu.v[Y(opcode)];
  // If vX equals KK, skip instruction
  if (vx === vy) {
    cpu.programCounter += 2;
  }
}
export function _0x6_LOAD(cpu: Chip8, opcode: number) {
  const kk = KK(opcode)
  const x = X(opcode);
  cpu.v[x] = kk;
}


export function _0x7_ADD_VX(cpu: Chip8, opcode: number) {
  cpu.v[X(opcode)] += KK(opcode);
}

export function _0x9_SKIP_INSTRUCTION(cpu: Chip8, opcode: number) {
  const vx = cpu.v[X(opcode)];
  const vy = cpu.v[Y(opcode)];
  // If vX equals KK, skip instruction
  if (vx !== vy) {
    cpu.programCounter += 2;
  }
}
export function _0xA_SET_I(cpu: Chip8, opcode: number) {
  cpu.i = NNN(opcode);
}



export function _0xC_RANDOM(cpu: Chip8, opcode: number) {
  const random = Math.random() * (256 - 0);
  const x = X(opcode);

  cpu.v[x] = random & KK(opcode);
}


export function _0xD_DRAW(cpu: Chip8, opcode: number) {
  const height = N(opcode); // height of sprite, N of opcode, sprite is 8 bits long, each bit is for each pixel
  const width = 8;



  // Loop through the height;
  cpu.v[0xf] = 0;
  for (let y = 0; y < height; y++) {
    const vy = cpu.v[Y(opcode)];
    const vx = cpu.v[X(opcode)];

    const currentSprite = cpu.ram[cpu.i + y];

    // Bitmask with 128 = 1000000
    let bitmask = 0x80
    // Loop through width of sprite
    for (let x = 0; x < width; x++) {
      // Boolean/Bit of the current bit of the sprite 
      const xPos = (vx + x) % SCREEN_WIDTH;
      const yPos = (vy + y) % SCREEN_HEIGHT;

      const vramValue = cpu.vram[yPos * SCREEN_WIDTH + xPos]

      const currentPixelValue = (currentSprite & bitmask >> x) !== 0;
      let pixelValue;

      // XOR
      if (currentPixelValue !== vramValue) {
        pixelValue = true;
      } else {
        if (cpu.vram[(yPos * SCREEN_WIDTH) + xPos] === true) {
          cpu.v[0xf] = 1;
        }
        pixelValue = false;
      }
      cpu.setPixel(xPos, yPos, pixelValue);

    }
  }

}

export function _0xE_SKIP_IF_KEYPRESS(cpu: Chip8, opcode: number) {
  const kk = KK(opcode);
  switch (kk) {
    case 0xA1:
      // if input is pressed
      const pressed: any = cpu.input[cpu.v[X(opcode)]];
      if (pressed) {
        cpu.programCounter += 2
      }
      break;
    case 0xE9:
      break;

    default:
      cpu.paused = true;
      throw new Error(`Not implemented: - 0x${opcode.toString(16)}`)
      break;
  }
}


export function _0xF_MISC(cpu: Chip8, opcode: number) {
  switch (KK(opcode)) {
    case 0x07:
      _0xFX07_SET_VX_DELAY_TIMER(cpu, opcode);
      break;
    case 0x15:
      _0xFX18_SET_DELAY_TIMER(cpu, opcode);
      break;
    case 0x18:
      _0xFX18_SET_SOUND_TIMER(cpu, opcode);
      break;
    case 0x29:
      _0xFX29_SET_SPRITE_LOCATION(cpu, opcode);
      break;
    case 0x33:
      _0xFX33_STORE_V_IN_MEMORY(cpu, opcode);
      break;
    case 0x65:
      _0xFX65_READ_FROM_MEMORY(cpu, opcode);
      break;
    default:
      cpu.paused = true;
      throw new Error(`Not implemented: - 0x${opcode.toString(16)}`)
      break;
  }
}

export function _0xFX07_SET_VX_DELAY_TIMER(cpu: Chip8, opcode: number) {
  cpu.v[X(opcode)] = cpu.delayTimer;
}
export function _0xFX18_SET_DELAY_TIMER(cpu: Chip8, opcode: number) {
  cpu.delayTimer = cpu.v[X(opcode)];
}


export function _0xFX18_SET_SOUND_TIMER(cpu: Chip8, opcode: number) {
  cpu.soundTimer = cpu.v[X(opcode)];
}

export function _0xFX29_SET_SPRITE_LOCATION(cpu: Chip8, opcode: number) {
  const digit = cpu.v[X(opcode)];
  // Sprite is 5 bytes long
  cpu.i = 0 + digit * 5;
}

export function _0xFX33_STORE_V_IN_MEMORY(cpu: Chip8, opcode: number) {
  const vx = cpu.v[X(opcode)]
  const hundreds = (vx / 100 | 0);
  const tens = (vx - (hundreds * 100) / 10) | 0;
  const last = (vx - (hundreds * 100) - (tens * 10));
  cpu.ram[cpu.i] = hundreds;
  cpu.ram[cpu.i + 1] = tens;
  cpu.ram[cpu.i + 2] = last;
}


export function _0xFX65_READ_FROM_MEMORY(cpu: Chip8, opcode: number) {
  for (let i = 0; i < X(opcode); i++) {
    cpu.v[i] = cpu.ram[cpu.i + i];
  }
}

export const OPCODE_MAP = new Map<number, OpcodeFunction>();

