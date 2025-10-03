// i will get rid of the enemy and

export const worldstateSaveData = {
    terminals: {
        id: "BunkerLevelScene",
        position: {
            x: 1722.03,
            y: 1015.65,
        },
        attempted: false,
        completed: true,
    },
    triggerZones: [
        {
            id: 20,
            type: "generic-trigger",
            x: 2986.5,
            y: 1400,
            width: 13,
            height: 198.5,
        },
    ],
    levelProgress: {
        BunkerLevelScene: {},
    },
    levelId: "BunkerLevelScene",
    floppyDisks: {
        "1": {
            colour: "green",
            collected: false,
            position: {
                x: 2413.13,
                y: 103.093,
            },
        },
        "2": {
            colour: "blue",
            collected: false,
            position: {
                x: 2810.23,
                y: 2317.68,
            },
        },
        "3": {
            colour: "red",
            collected: false,
            position: {
                x: 603.284,
                y: 2107.67,
            },
        },
        "17": {
            colour: "red",
            collected: false,
            position: {
                x: 764,
                y: 1368,
            },
        },
    },
    enemyStates: {
        "5": {
            id: 5,
            position: {
                x: 2917.14,
                y: 1424.21,
            },
            interacted: false,
            alive: true,
            type: "bitey",
        },
        "6": {
            id: 6,
            position: {
                x: 2923.4568489628,
                y: 1540.23260414881,
            },
            interacted: false,
            alive: true,
            type: "bitey",
        },
        "7": {
            id: 7,
            position: {
                x: 1254.92885307732,
                y: 349.734270529745,
            },
            interacted: false,
            alive: true,
            type: "rolly",
        },
        "9": {
            id: 9,
            position: {
                x: 1368,
                y: 1952,
            },
            interacted: false,
            alive: true,
            type: "rolly",
        },
        "10": {
            id: 10,
            position: {
                x: 852,
                y: 788,
            },
            interacted: false,
            alive: true,
            type: "rolly",
        },
    },
    levelInfo: {
        mapId: "BunkerLevelMap",
        tilesetName: "BunkerLevelTileset",
        tilesetKey: "BunkerLevelTileset",
        tilesetOverlayName: "BunkerLevelTilesetOverlay",
        tilesetOverlayKey: "BunkerLevelTilesetOverlay",
        musicKey: "WakeyWakey",
    },
};

export const playerStateSaveData = {
    position: {
        x: 2241.0299999999997,
        y: 1107,
    },
    health: 100,
    character: "thinker",
    score: 20,
    level: 1,
    lives: 3,
};
