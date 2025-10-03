// lots of errors on this file don't be alarmed just bc im choosing to load as if there is from the json atm and still working on mocking the save data!

export const worldstateSaveData = {
    terminals: {
        id: "LabLevelScene",
        position: {
            x: 3520.75,
            y: 1682.83333333333,
        },
        attempted: false,
        completed: true,
    },
    triggerZones: [
        {
            id: 13,
            type: "generic-trigger",
            x: 3799.16666666667,
            y: 2428.83333333333,
            width: 40.3333333333335,
            height: 260.833333333333,
        },
    ],
    levelProgress: {
        LabLevelScene: {},
    },
    levelId: "LabLevelScene",
    floppyDisks: {
        "4": {
            colour: "red",
            collected: true,
            position: {
                x: 174,
                y: 706,
            },
        },
        "5": {
            colour: "blue",
            collected: true,
            position: {
                x: 3253.33333333333,
                y: 323.666666666667,
            },
        },
        "11": {
            colour: "green",
            collected: false,
            position: {
                x: 1596.66666666667,
                y: 406.666666666667,
            },
        },
        "14": {
            colour: "blue",
            collected: false,
            position: {
                x: 3774,
                y: 3292,
            },
        },
    },
    enemyStates: {
        "2": {
            id: 2,
            position: {
                x: 3765.37878787879,
                y: 2644.30303030303,
            },
            interacted: false,
            alive: true,
            type: "bitey",
        },
        "3": {
            id: 3,
            position: {
                x: 3767.66666666667,
                y: 2505.33333333333,
            },
            interacted: false,
            alive: true,
            type: "bitey",
        },
        "7": {
            id: 7,
            position: {
                x: 1174.5,
                y: 2295.08333333333,
            },
            interacted: false,
            alive: true,
            type: "rolly",
        },
        "8": {
            id: 8,
            position: {
                x: 2565.25,
                y: 1738.5,
            },
            interacted: false,
            alive: true,
            type: "rolly",
        },
        "9": {
            id: 9,
            position: {
                x: 584,
                y: 3262.75,
            },
            interacted: false,
            alive: true,
            type: "rolly",
        },
        "10": {
            id: 10,
            position: {
                x: 1580.5,
                y: 3138.5,
            },
            interacted: false,
            alive: true,
            type: "rolly",
        },
    },
    levelInfo: {
        mapId: "LabLevelMap",
        tilesetName: "tileset1",
        tilesetKey: "LabLevelTileset",
        tilesetOverlayName: "tileset1",
        tilesetOverlayKey: "LabLevelTileset",
        musicKey: "WakeyWakey",
    },
};

export const playerStateSaveData = {
    position: {
        x: 1378,
        y: 458,
    },
    health: 100,
    character: "Dreamer",
    score: 140,
    level: 1,
    lives: 3,
};
