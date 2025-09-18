import { Scene } from "phaser";

export class PreloadScene extends Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // this.load.audio("menu", "/assets/music/Main-Menu.wav");

    this.load.setPath("/assets/character-sprites/");
    this.load.image("thinker", "thinker-standing.png");
    this.load.image("thinker-left", "thinker-walking-left.png");
    this.load.image("thinker-right", "thinker-walking-right.png");

    this.load.setPath("assets/enemy-sprites");
    this.load.image("bitey", "bitey.png");
    this.load.spritesheet("rolly", "rolly-ss.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.setPath("/assets/maps/");
    this.load.tilemapTiledJSON("BunkerLevelScene", "BunkerLevelScene.json");
    this.load.setPath("assets/tilesets/");
    this.load.image("BunkerLevelScene", "BunkerLevelScene.png");
  }

  create() {
    this.scene.start("BunkerLevelScene");
  }
}
