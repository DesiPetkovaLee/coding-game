import eventBus from "../../core/EventBus";
import { BaseSprite } from "../BaseSprite";
import type { CharacterConfig } from "./CharacterConfig";

export class Player extends BaseSprite {
    keyW: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;
    keyE: Phaser.Input.Keyboard.Key;
    keyEnter: Phaser.Input.Keyboard.Key;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config: CharacterConfig
    ) {
        super(scene, x, y, "player-sheet", 0);

        if (!scene.input.keyboard) {
            throw new Error("Keyboard input not initialized");
        }
        this.keyW = scene.input.keyboard.addKey("W");
        this.keyA = scene.input.keyboard.addKey("A");
        this.keyS = scene.input.keyboard.addKey("S");
        this.keyD = scene.input.keyboard.addKey("D");
        this.keyE = scene.input.keyboard.addKey("E");
        this.keyEnter = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.keyEnter.on("down", () => {
            this.tryInteract();
        });
        this.keyE.on("down", () => {
            this.tryInteract();
        });

        // animations
        this.anims.create({
            key: "standingAnim",
            frames: Array.isArray(config.animations.standingAnim)
                ? config.animations.standingAnim.map((frame) => ({
                      key: config.textureKey,
                      frame,
                  }))
                : this.anims.generateFrameNumbers(
                      config.textureKey,
                      config.animations.standingAnim
                  ),
            frameRate: 0.8,
            repeat: -1,
        });
        this.anims.create({
            key: "walk-sideways",
            frames: config.animations.walkSideways.map((frame) => ({
                key: config.textureKey,
                frame,
            })),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: "walk-towards",
            frames: config.animations.walkTowards.map((frame) => ({
                key: config.textureKey,
                frame,
            })),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "walk-away",
            frames: config.animations.walkAway.map((frame) => ({
                key: config.textureKey,
                frame,
            })),
            frameRate: 4,
            repeat: -1,
        });

        this.on("moved", () => {
            eventBus.emit("playerMoved", { x: this.x, y: this.y });
        });
    }

    // these should be change able for diff textures
    update() {
        const body = this.getBody();
        body.setVelocity(0);

        if (this.keyW?.isDown) {
            this.anims.play("walk-away", true);
            body.velocity.y = -420;
            this.emit("moved");
        } else if (this.keyS?.isDown) {
            this.anims.play("walk-towards", true);
            body.velocity.y = 420;
            this.emit("moved");
        } else if (this.keyA?.isDown) {
            body.velocity.x = -420;
            this.anims.play("walk-sideways", true);
            this.setFlipX(false);
            this.emit("moved");
        } else if (this.keyD?.isDown) {
            this.anims.play("walk-sideways", true);
            body.velocity.x = 420;
            this.setFlipX(true);
            this.emit("moved");
        } else {
            this.anims.play("standingAnim", true);
        }
    }
    faceAway() {
        this.setTexture("player-sheet", 7);
    }

    tryInteract() {
        eventBus.emit("playerInteract", this.x, this.y);
    }
}
