/* eslint-disable @typescript-eslint/no-unused-vars */
// mock data
export const data = [
    {
        level: 1,
        tilemap: "path",
        tileset: {
            main: "path",
            mainKey: "level1tileset",
            overlay: "overlay",
            overlayKey: "overlaykey",
        },
    },
];

export const WorldStateData = {
    currentLevel: "BunkerLevelScene",
    levelProgress: {
        BunkerLevelScene: { disksCollected: 2, enemiesDefeated: 5 },
    },
    terminals: {
        BunkerLevelScene: {
            attempted: true,
            completed: true,
            position: { x: 400, y: 300 },
        },
    },
    floppyDisks: {
        "disk-red": {
            colour: "red",
            collected: true,
            position: { x: 150, y: 250 },
        },
    },
    enemyStates: {
        "bitey-1": {
            id: "bitey-1",
            position: { x: 300, y: 400 },
            interacted: true,
            type: "bitey",
            alive: false,
        },
        "rolly-2": {
            id: "rolly-2",
            position: { x: 600, y: 200 },
            interacted: false,
            type: "rolly",
            alive: true,
        },
    },
    triggerZones: {
        BunkerLevelScene: [
            {
                id: "exit-zone",
                type: "levelExit",
                x: 1200,
                y: 300,
                width: 64,
                height: 64,
                targetLevel: "bunker-4",
            },
        ],
    },
};

// data from save data as json- not initialised properly
const worldDataLvl1 = {
    terminals: {},
    triggerZones: {},
    levelProgress: {
        BunkerLevelScene: {},
    },
    currentLevel: "BunkerLevelScene",
    floppyDisks: {
        "1": {
            colour: "green",
            collected: true,
            position: {
                x: 2413.13,
                y: 103.093,
            },
        },
        "2": {
            colour: "blue",
            collected: true,
            position: {
                x: 2810.23,
                y: 2317.68,
            },
        },
        "3": {
            colour: "red",
            collected: true,
            position: {
                x: 603.284,
                y: 2107.67,
            },
        },
        "17": {
            colour: "red",
            collected: true,
            position: {
                x: 764,
                y: 1368,
            },
        },
    },
    enemyStates: {
        "rolly-1": {
            position: {
                x: 2229.133742848015,
                y: 695.0399999998955,
            },
        },
        "rolly-3": {
            position: {
                x: 2147.5666666667757,
                y: 2357.5199999999777,
            },
        },
        "rolly-2": {
            position: {
                x: 1031.8999999998364,
                y: 920.1000000000427,
            },
        },
    },
};

const playerStateDataLvl1 = {
    position: {
        x: 2923,
        y: 1459,
    },
    health: -20,
    character: "Dreamer",
    score: 220,
    level: 1,
};
