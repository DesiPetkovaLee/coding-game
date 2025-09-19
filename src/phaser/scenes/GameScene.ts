import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  create() {
    this.add.rectangle(400, 300, 760, 560, 0x111827);
    this.add.text(24, 560, "Phaser is running", {
      fontSize: "12px",
      color: "#e2e8f0",
    });
  }
}

// this is a placeholder scene to verify that Phaser is set up correctly
// we need to delete this file and the reference to it when we start building the game
