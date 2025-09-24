import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";
import { Terminal } from "../prefabs/interactables/Terminal";
import { Player } from "../prefabs/characters/Player";
import { RollySprite } from "../prefabs/enemies/RollySprite";

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
        const enemies: RollySprite[] = [];
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
                    enemies.push(new RollySprite(this.scene, x, y, "rolly"));
                    break;
                case "floppy-disk": {
                    const colour = tiledProps.colour ?? "default";
                    const textureMap: Record<string, string> = {
                        red: "floppy-red",
                        green: "floppy-green",
                        blue: "floppy-blue",
                        default: "floppy-red",
                    };

                    const texture = textureMap[colour] ?? textureMap.default;
                    disks.push(new FloppyDisk(this.scene, x, y, texture));
                    console.log(tiledProps.colour);
                    break;
                }

                case "terminal":
                    terminals.push(new Terminal(this.scene, x, y, "terminal"));
                    break;
            }
        }

        return {
            player,
            enemies,
            disks,
            terminals,
        };
    }
}
type SpawnerResult = {
    player: Player;
    enemies: RollySprite[];
    disks: FloppyDisk[];
    terminals: Terminal[];
};
