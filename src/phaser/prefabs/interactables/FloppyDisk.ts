import eventBus from "../../core/EventBus";
import { gameState } from "../../core/GameState";
import { BaseInteractable } from "./BaseInteractable";
// import type { Player } from "../characters/Player";

export class FloppyDisk extends BaseInteractable {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.on("pointerdown", () => {
            console.log("clicked floppydisk");
            gameState.updateScore(50);
            eventBus.emit("updateUI", gameState.stats);
            console.log(gameState.stats);
        });
    }
}
