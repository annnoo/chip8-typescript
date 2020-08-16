import { Chip8 } from './Chip8';
import { initVram } from './VRam';
import { kk as KK, X } from './Util';

export type OpcodeFunction = (cpu: Chip8, opcode: number) => void

export interface OpcodeMap {
  [key: number]: OpcodeFunction;
}

export const BasicOpcodes: OpcodeMap = {
  0x0: _0x0_CLEAR_OR_RETURN,
  0x6: _0x0_LOAD,
}

export function _0x0_CLEAR_OR_RETURN(cpu: Chip8, opcode: number) {
  cpu.programCounter = this.stack.pop()
}

export function _0x00E0_CLEAR_SCREEN(cpu: Chip8, opcode: number) {
  cpu.vram = initVram();
}

export function _0x0_LOAD(cpu: Chip8, opcode: number) {
  const kk = KK(opcode)
  const x = X(opcode);
  cpu.v[x] = kk;
}

export const OPCODE_MAP = new Map<number, OpcodeFunction>();

