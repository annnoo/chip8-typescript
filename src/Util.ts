export const START = (opcode: number) => opcode >> 12;
export const X = (opcode: number) => (opcode & 0x0F00) >> 8;
export const y = (opcode: number) => (opcode & 0x0F00) >> 8;
export const kk = (opcode: number) => opcode & 0x00FF