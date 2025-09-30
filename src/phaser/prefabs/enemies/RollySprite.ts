import { BaseSprite } from "../BaseSprite";

export class RollySprite extends BaseSprite {
    id: string | number;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        id: string | number
        // frame: string | number
    ) {
        super(scene, x, y, texture);
        this.id = id;

        this.getBody().setSize(30, 60);
        this.getBody().setBounce(0.2, 0.2);
        this.setScale(1.1);
        this.setVelocity(
            Phaser.Math.Between(-60, 60),
            Phaser.Math.Between(-60, 60)
        );
        // rolling animation
        this.anims.create({
            key: "roll",
            frames: this.anims.generateFrameNumbers(texture, {
                start: 0,
                end: 4,
            }),
            frameRate: 3,
            repeat: -1,
        });
    }
    update() {
        const body = this.getBody();
        if (body.velocity.x > 0) {
            this.anims.play("roll", true);
            this.setFlipX(true);
        } else if (body.velocity.x < 0) {
            this.anims.play("roll", true);
            this.setFlipX(false);
        }
    }
}
