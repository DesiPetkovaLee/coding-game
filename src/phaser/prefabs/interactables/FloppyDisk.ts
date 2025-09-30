import eventBus from "../../core/EventBus";
import { worldState } from "../../core/States/WorldState";
import { BaseInteractable } from "./BaseInteractable";
import type { Interactable } from "../../systems/interactableInterface";

export class FloppyDisk extends BaseInteractable implements Interactable {
    toDelete: boolean = false;
    public colour!: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        id: number | string,
        colour: string
    ) {
        super(scene, x, y, texture, id);
        this.colour = colour;
    }

    interact() {
        console.log("clicked floppydisk");
        eventBus.emit("playerScored", 50);
        eventBus.emit("diskCollected", this.id);
        eventBus.emit("updateUI");
        console.log(worldState.getCollectedDiskCount());
        console.log(this.id);
        console.log(this.colour);
        console.log(worldState.getCollectedDiskCount());
        // pixellate and fade when clicked
        this.scene.tweens.add({
            targets: this.postFX.addPixelate(2),
            alpha: 0,
            duration: 600,
            onComplete: () => {
                this.toDelete = true;
            },
        });
    }
}
