import eventBus from "../../core/EventBus";
import { BaseInteractable } from "./BaseInteractable";
import type { Interactable } from "../../systems/interactableInterface";

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
        eventBus.emit("updateUI");
    }
}
