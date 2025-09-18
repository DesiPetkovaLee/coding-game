import { Physics } from "phaser";
export class BaseSprite extends Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string = "default-texture",
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    // Defensive check: is physics system initialized?
    if (!scene.physics || !scene.physics.add) {
      throw new Error(
        "Scene physics system not initialized—did you call this in create()?"
      );
    }

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  // physics.arcade.sprite doesn't guarantee the body is initialised immediately
  getBody(): Phaser.Physics.Arcade.Body {
    if (!this.body) {
      throw new Error("Body is not initialized");
    }
    return this.body as Phaser.Physics.Arcade.Body;
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

  // setInteractive might be a good method to have here
  // setDrag
  // setMaxVelocity
}
