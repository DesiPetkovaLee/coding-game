import { BaseSprite } from "../BaseSprite";

export class Player extends BaseSprite {
    keyW: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player-sheet", 0);

        if (!scene.input.keyboard) {
            throw new Error("Keyboard input not initialized");
        }

        this.keyW = scene.input.keyboard.addKey("W");
        this.keyA = scene.input.keyboard.addKey("A");
        this.keyS = scene.input.keyboard.addKey("S");
        this.keyD = scene.input.keyboard.addKey("D");

        this.getBody().setSize(30, 95);
        this.getBody().setOffset(48, 15);

        this.anims.create({
            key: "blink",
            frames: this.anims.generateFrameNumbers("player-sheet", {
                start: 0,
                end: 1,
            }),
            frameRate: 0.8,
            repeat: -1,
        });

        this.anims.create({
            key: "walk",
            frames: [
                { key: "player-sheet", frame: 2 },
                { key: "player-sheet", frame: 3 },
                { key: "player-sheet", frame: 4 },
                { key: "player-sheet", frame: 5 },
                { key: "player-sheet", frame: 6 },
            ],
            frameRate: 2,
            repeat: -1,
            yoyo: true,
        });
    }
    // these should be change able for diff textures
    update() {
        const body = this.getBody();
        body.setVelocity(0);

        if (this.keyW?.isDown) {
            this.setTexture("player-sheet", 7);
            body.velocity.y = -320;
        } else if (this.keyS?.isDown) {
            this.anims.play("walk", true);
            body.velocity.y = 320;
        } else if (this.keyA?.isDown) {
            body.velocity.x = -320;
            this.anims.play("walk", true);
            this.setFlipX(false);
        } else if (this.keyD?.isDown) {
            this.anims.play("walk", true);
            body.velocity.x = 320;
            this.setFlipX(true);
        } else {
            this.anims.play("blink", true);
        }
    }
    faceAway() {
        this.setTexture("player-sheet", 7);
    }
}
