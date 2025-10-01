import eventBus from "../../core/EventBus";
import { BaseSprite } from "../BaseSprite";

export class Player extends BaseSprite {
    keyW: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;
    keyEnter: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player-sheet", 0);

        if (!scene.input.keyboard) {
            throw new Error("Keyboard input not initialized");
        }

        this.keyW = scene.input.keyboard.addKey("W");
        this.keyA = scene.input.keyboard.addKey("A");
        this.keyS = scene.input.keyboard.addKey("S");
        this.keyD = scene.input.keyboard.addKey("D");
        this.keyEnter = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        this.getBody().setSize(30, 95);
        this.getBody().setOffset(48, 5);

        this.keyEnter.on("down", () => {
            this.tryInteract();
        });

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
            key: "walk-sideways",
            frames: [
                { key: "player-sheet", frame: 2 },
                { key: "player-sheet", frame: 3 },
                { key: "player-sheet", frame: 4 },
                { key: "player-sheet", frame: 5 },
                { key: "player-sheet", frame: 6 },
                { key: "player-sheet", frame: 7 },
                { key: "player-sheet", frame: 8 },
                { key: "player-sheet", frame: 9 },
            ],
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "walk-towards",
            frames: [
                { key: "player-sheet", frame: 22 },
                { key: "player-sheet", frame: 23 },
                { key: "player-sheet", frame: 24 },
                { key: "player-sheet", frame: 25 },
                { key: "player-sheet", frame: 26 },
                { key: "player-sheet", frame: 27 },
                { key: "player-sheet", frame: 28 },
                { key: "player-sheet", frame: 29 },
                { key: "player-sheet", frame: 30 },
                { key: "player-sheet", frame: 31 },
                { key: "player-sheet", frame: 32 },
                { key: "player-sheet", frame: 33 },
            ],
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "walk-away",
            frames: [
                { key: "player-sheet", frame: 10 },
                { key: "player-sheet", frame: 11 },
                { key: "player-sheet", frame: 12 },
                { key: "player-sheet", frame: 13 },
                { key: "player-sheet", frame: 14 },
                { key: "player-sheet", frame: 15 },
                { key: "player-sheet", frame: 16 },
                { key: "player-sheet", frame: 17 },
                { key: "player-sheet", frame: 18 },
                { key: "player-sheet", frame: 19 },
                { key: "player-sheet", frame: 20 },
                { key: "player-sheet", frame: 21 },
            ],
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
            this.anims.play("blink", true);
        }
    }
    faceAway() {
        this.setTexture("player-sheet", 7);
    }

    tryInteract() {
        eventBus.emit("playerInteract", this.x, this.y);
    }
}
