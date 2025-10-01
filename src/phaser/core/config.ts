import Phaser from "phaser";
import { PreloadScene } from "../scenes/PreloadScene";
import { BunkerLevelScene } from "../scenes/BunkerLevelScene";
import { UIScene } from "../scenes/UIScene";
import { LabLevelScene } from "../scenes/LabLevelScene";

export const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    parent: "game-container",
    backgroundColor: "#deded1",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
    scene: [PreloadScene, BunkerLevelScene, LabLevelScene, UIScene],
    fps: {
        limit: 30,
    },
};
