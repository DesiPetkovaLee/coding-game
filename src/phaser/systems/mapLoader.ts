export class mapLoader {
    private scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
    loadMap(
        key: string,
        tilesetName: string,
        tilesetKey: string
    ): TilemapResult {
        const map = this.scene.make.tilemap({ key });
        const tilesTerrain = map.addTilesetImage(
            tilesetName,
            tilesetKey
        ) as Phaser.Tilemaps.Tileset;
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
