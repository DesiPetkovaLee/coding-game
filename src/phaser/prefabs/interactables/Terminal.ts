import { BaseInteractable } from "./BaseInteractable";
// import type { Player } from "../characters/Player";

export class Terminal extends BaseInteractable {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.on("pointerdown", () => {
            console.log("terminal clicked");
        });
    }
}
