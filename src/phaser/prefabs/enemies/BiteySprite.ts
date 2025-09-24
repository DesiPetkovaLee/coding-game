import { BaseSprite } from "../BaseSprite";

export class RollySprite extends BaseSprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.getBody().setSize(56, 100);

    this.anims.create({
      key: "bite",
      frames: this.anims.generateFrameNumbers(texture, {
        start: 0,
        end: 24,
      }),
      frameRate: 2,
      delay: 6000,
      repeat: -1,
      repeatDelay: 6000,
    });
  }
  update() {
    this.anims.play("bite", true);
  }
}
