export class NotImplementedError implements Error {
  name = "OpcodeNotImplementedError";
  message: string;
  stack?: string;

  constructor(opcode: number) {
    this.message = `Not implemented: - 0x${opcode.toString(16)}`
  }

}