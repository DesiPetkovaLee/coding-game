import { BaseInteractable } from "./BaseInteractable";
// import type { Player } from "../characters/Player";

export class FloppyDisk extends BaseInteractable {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.on("pointerdown", () => {
            console.log("floppy disk clicked");
        });
    }
}
