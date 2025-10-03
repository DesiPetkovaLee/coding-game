export type CharacterConfig = {
    textureKey: string;
    animations: {
        standingAnim: number[] | { start: number; end: number };
        walkSideways: number[];
        walkTowards: number[];
        walkAway: number[];
    };
    bodySize?: { width: number; height: number };
    bodyOffset?: { x: number; y: number };
    defaultFrame?: number;
};
export const dreamerConfig: CharacterConfig = {
    textureKey: "dreamer-sheet",
    animations: {
        standingAnim: { start: 0, end: 1 },
        walkSideways: [2, 3, 4, 5, 6, 7, 8, 9],
        walkTowards: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        walkAway: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    },
    bodySize: { width: 30, height: 95 },
    bodyOffset: { x: 48, y: 5 },
    defaultFrame: 0,
};
export const thinkerConfig: CharacterConfig = {
    textureKey: "thinker-sheet",
    animations: {
        standingAnim: { start: 0, end: 3 },
        walkSideways: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        walkTowards: [30, 31, 32, 33, 34, 35, 36, 37, 38],
        walkAway: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    },
    bodySize: { width: 40, height: 95 },
    bodyOffset: { x: 0, y: 0 },
    defaultFrame: 0,
};
