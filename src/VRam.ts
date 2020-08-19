export const SCREEN_WIDTH = 64;
export const SCREEN_HEIGHT = 32;


// export const initVram = () => new Array(SCREEN_HEIGHT).fill(false).map(() => Array(SCREEN_WIDTH).fill(false));
export const initVram = () => new Array(SCREEN_HEIGHT * SCREEN_WIDTH).fill(false);
