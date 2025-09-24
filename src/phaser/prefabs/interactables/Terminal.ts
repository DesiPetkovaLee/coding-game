import eventBus from "../../core/EventBus";
import { gameState } from "../../core/GameState";
import { BaseInteractable } from "./BaseInteractable";
// import type { Player } from "../characters/Player";

export class Terminal extends BaseInteractable {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.on("pointerdown", () => {
            console.log("clicked terminal");
            gameState.updateScore(10);
            eventBus.emit("updateUI", gameState.stats);
            console.log(gameState.stats);
        });
    }
}
