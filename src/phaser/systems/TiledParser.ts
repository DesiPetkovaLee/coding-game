export type Coords = { x: number; y: number };

export type EnemySpawnData = {
    id: string | number;
    type: string;
    coords: Coords;
};

export type FloppyDiskData = {
    id: string | number;
    colour: string;
    coords: Coords;
};

export type TriggerZoneData = {
    id?: string | number;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

export type TerminalData = {
    id: string | number;
    coords: Coords;
};

export type SpawnData = {
    player: Coords;
    enemies: EnemySpawnData[];
    floppyDisks: FloppyDiskData[];
    triggerZones: TriggerZoneData[];
    terminals: TerminalData[];
};

export class TiledParser {
    static extractData(map: Phaser.Tilemaps.Tilemap): SpawnData | undefined {
        const objectLayer = map.getObjectLayer("Object");

        const player = objectLayer?.objects.find(
            (obj) => obj.name === "player"
        ) ?? {
            x: 100,
            y: 200,
            height: 0,
        };

        const enemies = objectLayer?.objects
            .filter((obj) => obj.name === "enemy")
            .map((obj, i) => ({
                id: obj.id || `enemy-${i}`,
                type:
                    obj.properties?.find(
                        (p: { name: string }) => p.name === "type"
                    )?.value || "rolly",
                coords: {
                    x: obj.x ?? 0,
                    y: (obj.y ?? 0) - (obj.height ?? 0),
                },
            }));

        const floppyDisks = objectLayer?.objects
            .filter((obj) => obj.name === "floppy-disk")
            .map((obj, i) => ({
                id: obj.id || `disk-${i}`,
                colour:
                    obj.properties?.find(
                        (p: { name: string }) => p.name === "colour"
                    )?.value || "red",
                // red as default if no other colour
                coords: {
                    x: obj.x ?? 0,
                    y: (obj.y ?? 0) - (obj.height ?? 0),
                },
            }));

        const terminals = objectLayer?.objects
            .filter((obj) => obj.name === "terminal")
            .map((obj, i) => ({
                id: obj.id || `terminal-${i}`,
                coords: {
                    x: obj.x ?? 0,
                    y: (obj.y ?? 0) - (obj.height ?? 0),
                },
            }));

        const triggerZones =
            objectLayer?.objects
                .filter((obj) => obj.name === "trigger")
                .map((obj) => ({
                    id: obj.id,
                    type: obj.type || "generic-trigger",
                    x: obj.x ?? 0,
                    y: obj.y ?? 0,
                    width: obj.width ?? 0,
                    height: obj.height ?? 0,
                })) ?? [];

        if (player && enemies && floppyDisks && terminals && triggerZones) {
            return {
                player: {
                    x: player.x ?? 100,
                    y: (player.y ?? 0) - (player.height ?? 0),
                },
                enemies,
                floppyDisks,
                terminals,
                triggerZones,
            };
        }
    }
}
