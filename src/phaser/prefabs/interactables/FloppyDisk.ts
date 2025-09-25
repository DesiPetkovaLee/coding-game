import eventBus from "../../core/EventBus";
import { gameState } from "../../core/GameState";
import { BaseInteractable } from "./BaseInteractable";
// import type { Player } from "../characters/Player";

export class FloppyDisk extends BaseInteractable {
    toDelete: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.on("pointerdown", () => {
            console.log("clicked floppydisk");
            gameState.updateScore(50);
            gameState.updateDisksFound(1);
            eventBus.emit("updateUI", gameState.stats);
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
