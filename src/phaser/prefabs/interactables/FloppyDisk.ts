import eventBus from "../../core/EventBus";
import { BaseInteractable } from "./BaseInteractable";

export class FloppyDisk extends BaseInteractable {
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

        this.on("pointerdown", () => {
            console.log("clicked floppydisk");
            eventBus.emit("playerScored", 50);
            eventBus.emit("diskCollected", this.id);
            eventBus.emit("updateUI");
            console.log(this.id);
            console.log(this.colour);

            // pixellate and fade when clicked
            this.scene.tweens.add({
                targets: this.postFX.addPixelate(2),
                alpha: 0,
                duration: 600,
                onComplete: () => {
                    this.toDelete = true;
                },
            });
        });
    }
}
