/*
  Util functions for opcode getting
  Opcode: FFFF (2 Bytes)
  - START = Frist 4 Bit
  - X = ?X?? second 4 Bit
  - Y = ?XY? Thrid 4 Bit
  - kk = ??kk Last 8 Bit
  - nnn = ?nnn Last 12 Bit 
*/
// Get Start Byte
export const START = (opcode: number) => opcode >> 12;

export const X = (opcode: number) => (opcode & 0x0F00) >> 8;
export const Y = (opcode: number) => (opcode & 0x0F0) >> 4;
export const kk = (opcode: number) => opcode & 0x00FF
export const N = (opcode: number) => opcode & 0x000F;
export const NNN = (opcode: number) => opcode & 0x0FFF;


