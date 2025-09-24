export class CameraController {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    setup(
        player: Phaser.GameObjects.Sprite,
        map: Phaser.Tilemaps.Tilemap
    ): Phaser.Cameras.Scene2D.Camera {
        const camera = this.scene.cameras.main;
        const tileWidth = map.tileWidth;
        const tileHeight = map.tileHeight;
        const boundsX = map.width * tileWidth;
        const boundsY = map.height * tileHeight;
        camera.setBounds(0, 0, boundsX, boundsY);
        camera.startFollow(player, true, 0.1, 0.1);
        camera.zoom = 1;
        camera.fadeIn(4000);
        return camera;
    }
}
