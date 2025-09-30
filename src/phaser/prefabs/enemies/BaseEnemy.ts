import type { Interactable } from "../../systems/interactableInterface";
import { BaseSprite } from "../BaseSprite";

export abstract class BaseEnemy extends BaseSprite implements Interactable {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
    abstract interact(): void;
}
