import eventBus from "../../core/EventBus";
import { gameState } from "../../core/States/GameState";
import { playerState } from "../../core/States/PlayerState";
import { BaseInteractable } from "./BaseInteractable";

export class FloppyDisk extends BaseInteractable {
    toDelete: boolean = false;
    public colour!: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        colour: string,
        id: number | string
    ) {
        super(scene, x, y, texture, id);
        this.colour = colour;

        this.on("pointerdown", () => {
            console.log("clicked floppydisk");
            gameState.updateScore(50);
            gameState.updateDisksFound(this.colour);
            eventBus.emit("updateUI", gameState.stats);
            eventBus.emit("playerScored", 50);
            console.log(this.id);
            console.table(playerState.getSaveData());
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
