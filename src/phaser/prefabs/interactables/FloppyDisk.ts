import eventBus from "../../core/EventBus";
import { gameState } from "../../core/GameState";
import { BaseInteractable } from "./BaseInteractable";
// import type { Player } from "../characters/Player";

export class FloppyDisk extends BaseInteractable {
    toDelete: boolean = false;
    public colour!: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        colour: string
    ) {
        super(scene, x, y, texture);
        this.colour = colour;

        this.on("pointerdown", () => {
            console.log("clicked floppydisk");
            gameState.updateScore(50);
            gameState.updateDisksFound(this.colour);
            eventBus.emit("updateUI", gameState.stats);
            console.log(this.colour);
            // fade out when clicked
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
