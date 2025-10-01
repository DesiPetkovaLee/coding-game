import { worldState } from "../../core/States/WorldState";
import { BaseEnemy } from "./BaseEnemy";

export class BiteySprite extends BaseEnemy {
    id: string | number;
    toDelete: boolean = false;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        id: string | number
    ) {
        super(scene, x, y, texture);
        this.id = id;

        this.getBody().setSize(56, 100);
        this.setImmovable(true);

        this.anims.create({
            key: "bite",
            frames: this.anims.generateFrameNumbers(texture, {
                start: 0,
                end: 24,
            }),
            frameRate: 12,
            delay: 6000,
            repeat: -1,
            repeatDelay: 6000,
        });

        // will need to update if bitey moves out of the way
        worldState.setEnemyPosition(this.id, { x: this.x, y: this.y });
    }
    interact(): void {
        console.log("bitey clicked");
        console.log(worldState.getCollectedDiskCount());
        if (worldState.getCollectedDiskCount() === 4) {
            this.toDelete = true;
        } else {
            console.log("You need all 4 disks to delete Bitey!");
        }
    }
    update() {
        this.anims.play("bite", true);
    }
}
