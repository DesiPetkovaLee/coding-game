export class mapLoader {
    private scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
    loadMap(key: string, path: string): TilemapResult {
        const map = this.scene.make.tilemap({ key });
        const tilesTerrain = map.addTilesetImage(
            "level-0-map.tsx",
            "BunkerLevelTileset"
        ) as Phaser.Tilemaps.Tileset;
        // const tilesPlants = map.addTilesetImage(
        //   "3_plants",
        //   "plants-tileset"
        // ) as Phaser.Tilemaps.Tileset;
        map.createLayer("base", tilesTerrain, 0, 0);
        const collisionLayer = map.createLayer("collisions", [
            tilesTerrain,
            //   tilesPlants,
        ]) as Phaser.Tilemaps.TilemapLayer;
        collisionLayer?.setCollisionByExclusion([-1]);

        this.scene.physics.world.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        return { map, collisionLayer };
    }
}

type TilemapResult = {
    map: Phaser.Tilemaps.Tilemap;
    collisionLayer: Phaser.Tilemaps.TilemapLayer;
};
