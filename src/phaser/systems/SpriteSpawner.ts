import { Player } from "../prefabs/Player";
import { RollySprite } from "../prefabs/RollySprite";

export class Spawner {
    private scene: Phaser.Scene;
    private map: Phaser.Tilemaps.Tilemap;
    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene;
        this.map = map;
    }

    spawnEntities(): SpawnerResult {
        const objects = this.map.getObjectLayer("object")?.objects ?? [];

        let player!: Player;
        const enemies: RollySprite[] = [];
        // const discs: FloppyDiscs[] = [];

        for (const obj of objects) {
            const { x = 0, y = 0, name } = obj;

            switch (name) {
                case "player":
                    player = new Player(this.scene, x, y);
                    break;
                case "enemy":
                    enemies.push(new RollySprite(this.scene, x, y, "rolly"));
                    break;
                // case "data":
                //     chips.push(new DataChip(this.scene, x, y, "computer"));
                //     break;
            }
        }

        return {
            player,
            enemies,
            // discs
        };
    }
}
type SpawnerResult = {
    player: Player;
    enemies: RollySprite[];
    // data: FloppyDiscs[];
};
