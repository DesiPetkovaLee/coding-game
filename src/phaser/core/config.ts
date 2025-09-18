import Phaser from "phaser";
import { PreloadScene } from "../scenes/PreloadScene";
import { BunkerLevelScene } from "../scenes/BunkerLevelScene";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  parent: "game-container",
  backgroundColor: "#deded1",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [PreloadScene, BunkerLevelScene],
};

const StartGame = (parent) => {
  console.log("game is being created now with " + parent);
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
