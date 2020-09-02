import { OpcodeMap } from './Opcodes';
import { Chip8 } from './Chip8';
import { END, X, Y } from './Util';
import { NotImplementedError } from './NotImplementedError';

export const MathOpcodes: OpcodeMap = {
  0x0: _0x8XY0_LOAD_X_Y,
  0x1: _0x8XY1_OR_X_Y,
  0x2: _0x8XY2_AND_X_Y,
  0x3: _0x8XY3_XOR_X_Y,
  0x4: _0x8XY4_ADD_X_Y,
  0x5: _0x8XY5_SUB_X_Y,
  0x6: _0x8XY6_SHL_HALF_X,
  0x7: _0x8xy7_SUBN_VX_VY,
  0xE: _0x8XYE_SHL_DOUBLE_X
}

export function _0x8_MATH(cpu: Chip8, opcode: number) {
  const maskedOpcode = END(opcode)

  const opcodeFunction = MathOpcodes[maskedOpcode];
  if (opcodeFunction) {
    opcodeFunction(cpu, opcode);
  }
  else {
    throw new NotImplementedError(opcode);
  }

}

function _0x8XY0_LOAD_X_Y(cpu: Chip8, opcode: number) {
  cpu.v[X(opcode)] = cpu.v[Y(opcode)]
}

function _0x8XY1_OR_X_Y(cpu: Chip8, opcode: number) {
  cpu.v[X(opcode)] = cpu.v[Y(opcode)] | cpu.v[X(opcode)]
}

function _0x8XY2_AND_X_Y(cpu: Chip8, opcode: number) {
  cpu.v[X(opcode)] = cpu.v[Y(opcode)] & cpu.v[X(opcode)]
}

function _0x8XY3_XOR_X_Y(cpu: Chip8, opcode: number) {
  cpu.v[X(opcode)] = cpu.v[Y(opcode)] ^ cpu.v[X(opcode)]
}

function _0x8XY4_ADD_X_Y(cpu: Chip8, opcode: number) {
  const result = cpu.v[Y(opcode)] + cpu.v[X(opcode)];
  if (result > 255) {
    cpu.v[0xF] = 1;
  }
  else {
    cpu.v[0xF] = 0;
  }
  cpu.v[X(opcode)] = result;
}


function _0x8XY5_SUB_X_Y(cpu: Chip8, opcode: number) {
  const x = cpu.v[X(opcode)];
  const y = cpu.v[Y(opcode)];
  if (x > y) {
    cpu.v[0xF] = 1;
  }
  else {
    cpu.v[0xF] = 0;
  }
  cpu.v[X(opcode)] = x - y;
}

function _0x8XY6_SHL_HALF_X(cpu: Chip8, opcode: number) {
  const x = cpu.v[X(opcode)];
  const y = cpu.v[Y(opcode)];
  if (x & 0x01) {
    cpu.v[0xF] = 1;
  }
  else {
    cpu.v[0xF] = 0;
  }
  cpu.v[X(opcode)] = x / 2;
}

function _0x8XYE_SHL_DOUBLE_X(cpu: Chip8, opcode: number) {
  const x = cpu.v[X(opcode)];
  const y = cpu.v[Y(opcode)];
  if (x & 0x80) {
    cpu.v[0xF] = 1;
  }
  else {
    cpu.v[0xF] = 0;
  }
  cpu.v[X(opcode)] = x * 2;
}

function _0x8xy7_SUBN_VX_VY(cpu: Chip8, opcode: number) {
  const vx = cpu.v[X(opcode)];
  const vy = cpu.v[Y(opcode)];

  if (vy > vx) {
    cpu.v[0xf] = 1
  }
  else {
    cpu.v[0xf] = 0
  }
  cpu.v[X(opcode)] = vy - vx;
}