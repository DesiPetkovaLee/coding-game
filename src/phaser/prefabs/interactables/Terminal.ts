import eventBus from "../../core/EventBus";
import { BaseInteractable } from "./BaseInteractable";
import type { Interactable } from "../../systems/interactableInterface";
import type { Player } from "../characters/Player";

export class Terminal extends BaseInteractable implements Interactable {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        id: string | number
    ) {
        super(scene, x, y, texture, id);

        this.flipX = true;
    }
    interact() {
        console.log("clicked terminal");
        eventBus.emit("playerScored", 10);
        eventBus.emit("terminalCompleted", this.id);
    }
    update(player: Player) {
        const distance = Phaser.Math.Distance.Between(
            this.x,
            this.y,
            player.x,
            player.y
        );
        const inRange = distance < 300;

        if (inRange) {
            this.setTexture("terminal-active");
        } else {
            this.setTexture("terminal");
        }
    }
}
