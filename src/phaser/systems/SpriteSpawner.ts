import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";
import { Terminal } from "../prefabs/interactables/Terminal";
import { Player } from "../prefabs/characters/Player";
import { RollySprite } from "../prefabs/enemies/RollySprite";
import type { BaseSprite } from "../prefabs/BaseSprite";
import { BiteySprite } from "../prefabs/enemies/BiteySprite";

export class Spawner {
    private scene: Phaser.Scene;
    private map: Phaser.Tilemaps.Tilemap;
    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene;
        this.map = map;
    }

    spawnEntities(): SpawnerResult {
        const objects = this.map.getObjectLayer("Object")?.objects ?? [];

        let player!: Player;
        const enemies: BaseSprite[] = [];
        const disks: FloppyDisk[] = [];
        const terminals: Terminal[] = [];

        for (const obj of objects) {
            const { x = 0, y = 0, name, properties = [] } = obj;

            const tiledProps = Object.fromEntries(
                properties.map((p: { name: string; value: string }) => [
                    p.name,
                    p.value,
                ])
            );

            console.log("Disk object:", obj);
            console.log("Parsed props:", tiledProps);

            switch (name) {
                case "player":
                    player = new Player(this.scene, x, y);
                    console.log("player spawned at " + x + y);
                    break;
                case "enemy":
                    {
                        const type = tiledProps.type ?? "rolly";
                        const id = tiledProps.id;

                        let enemy;
                        if (type === "rolly") {
                            enemy = new RollySprite(
                                this.scene,
                                x,
                                y,
                                "rolly",
                                id
                            );
                        } else if (type === "bitey") {
                            enemy = new BiteySprite(
                                this.scene,
                                x,
                                y,
                                "bitey",
                                id
                            );
                        } else {
                            console.log(
                                `Unknown enemy type: ${type}, defaulting generated at x ${x} and ${y}`
                            );
                            enemy = new RollySprite(
                                this.scene,
                                x,
                                y,
                                "rolly",
                                id
                            );
                        }
                        enemies.push(enemy);
                    }
                    break;
                case "floppy-disk": {
                    const colour = tiledProps.colour ?? "default";
                    const id = obj.id?.toString();
                    const textureMap: Record<string, string> = {
                        red: "floppy-red",
                        green: "floppy-green",
                        blue: "floppy-blue",
                        default: "floppy-red",
                    };

                    const texture = textureMap[colour] ?? textureMap.default;
                    disks.push(
                        new FloppyDisk(this.scene, x, y, texture, id, colour)
                    );
                    console.log(tiledProps.colour);
                    break;
                }

                case "terminal": {
                    const id = obj.id?.toString();
                    terminals.push(
                        new Terminal(this.scene, x, y, "terminal", id)
                    );
                    break;
                }
            }
        }

        return {
            player,
            enemies,
            disks,
            terminals,
        };
    }

    exitZone() {
        const triggerLayer = this.map.getObjectLayer("Object");
        const exitZoneData = triggerLayer?.objects.find(
            (obj: { name: string }) => obj.name === "trigger"
        );
        if (
            exitZoneData &&
            exitZoneData.x &&
            exitZoneData.y &&
            exitZoneData.height
        ) {
            return new Phaser.Geom.Rectangle(
                exitZoneData?.x,
                exitZoneData?.y - exitZoneData.height,
                exitZoneData.width,
                exitZoneData.height
            );
        }
    }
}
type SpawnerResult = {
    player: Player;
    enemies: BaseSprite[];
    disks: FloppyDisk[];
    terminals: Terminal[];
};
