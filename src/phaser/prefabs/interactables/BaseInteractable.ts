// for immovable but interactive objects
// not sure if we should just use this and the constructor to make diff interactable or have seperate classes
import { Physics } from "phaser";
import type { Coords } from "../../systems/TiledParser";
import type { Player } from "../characters/Player";
export abstract class BaseInteractable extends Physics.Arcade.Sprite {
    id: string | number;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string = "default-texture",
        id: string | number,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame); // frame can be undefined
        this.id = id;

        if (!scene.physics || !scene.physics.add) {
            throw new Error("Scene physics system not initialised");
        }

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setTexture(texture);
    }

    getBody(): Phaser.Physics.Arcade.Body {
        if (!this.body) {
            throw new Error("Body is not initialized");
        }
        return this.body as Phaser.Physics.Arcade.Body;
    }

    getCoords(): Coords {
        const x = this.x;
        const y = this.y;

        return { x, y };
    }

    // sets proximity for interactions
    update(player: Player) {
        const distance = Phaser.Math.Distance.Between(
            this.x,
            this.y,
            player.x,
            player.y
        );
        const inRange = distance < 300;

        if (inRange && !this.input?.enabled) {
            this.setInteractive();
        } else if (!inRange && this.input?.enabled) {
            this.disableInteractive();
        }
    }
}
