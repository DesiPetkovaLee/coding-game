import eventBus from "../../core/EventBus";
import { gameState } from "../../core/States/GameState";
import { BaseInteractable } from "./BaseInteractable";

export class Terminal extends BaseInteractable {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        id: string | number
    ) {
        super(scene, x, y, texture, id);

        this.flipX = true;

        this.on("pointerdown", () => {
            console.log("clicked terminal");
            gameState.updateScore(10);
            eventBus.emit("updateUI", gameState.stats);
            eventBus.emit("playerScored", 10);
        });
    }
}
