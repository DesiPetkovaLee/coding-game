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
