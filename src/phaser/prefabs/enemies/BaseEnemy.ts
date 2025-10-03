// import eventBus from "../../core/EventBus";
import type { Interactable } from "../../systems/interactableInterface";
// import type { Coords } from "../../systems/TiledParser";
import { BaseSprite } from "../BaseSprite";

export abstract class BaseEnemy extends BaseSprite implements Interactable {
    // private lastPosition: Coords = { x: 0, y: 0 };
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
    abstract interact(): void;

    update() {
        // only log if the enemy has moved
        // const moved =
        //     this.x !== this.lastPosition.x || this.y !== this.lastPosition.y;
        // if (moved) {
        //     this.lastPosition = { x: this.x, y: this.y };
        //     eventBus.emit("enemyMoved", this.id, {
        //         x: this.x,
        //         y: this.y,
        //     });}
    }
}
