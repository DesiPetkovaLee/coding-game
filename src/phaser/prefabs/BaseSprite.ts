import { Physics } from "phaser";
export abstract class BaseSprite extends Physics.Arcade.Sprite {
    toDelete?: boolean;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string = "default-texture",
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);

        if (!scene.physics || !scene.physics.add) {
            throw new Error("Scene physics system not initialized");
        }
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
    }

    getBody(): Phaser.Physics.Arcade.Body {
        if (!this.body) {
            throw new Error("Body is not initialized");
        }
        return this.body as Phaser.Physics.Arcade.Body;
    }

    public getXCoord() {
        return this.x;
    }

    public getYCoord() {
        return this.y;
    }

    // flip image
    checkFlip() {
        if (this.body == null) {
            throw new Error("character body null");
        }
        if (this.body.velocity.x > 0) {
            this.scaleX = -0.8;
        } else {
            this.scaleX = 0.8;
        }
    }
}
