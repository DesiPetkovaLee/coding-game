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
        const objects = this.map.getObjectLayer("objects")?.objects ?? [];

        let player!: Player;
        const enemies: RollySprite[] = [];
        const disks: FloppyDisk[] = [];
        const terminals: Terminal[] = [];

        for (const obj of objects) {
            const { x = 0, y = 0, name } = obj;

            switch (name) {
                case "player":
                    player = new Player(this.scene, x, y);
                    break;
                case "enemy":
                    enemies.push(new RollySprite(this.scene, x, y, "rolly"));
                    break;
                case "disk":
                    disks.push(new FloppyDisk(this.scene, x, y, "disks"));
                    break;
                case "terminal":
                    terminals.push(new Terminal(this.scene, x, y, "terminals"));
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
