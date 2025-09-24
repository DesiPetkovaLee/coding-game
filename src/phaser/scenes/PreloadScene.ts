import { Scene } from "phaser";

export class PreloadScene extends Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // this.load.audio("menu", "/assets/music/Main-Menu.wav");
    this.load.audio("WakeyWakey", "/assets/music/WakeyWakey.mp3");

    this.load.setPath("/assets/character-sprites/");
    this.load.image("thinker", "thinker-standing.png");
    this.load.image("thinker-left", "thinker-walking.png");
    this.load.image("thinker-right", "thinker-walking-right.png");
    this.load.spritesheet("player-sheet", "dreamer-spritesheet.png", {
      frameHeight: 128,
      frameWidth: 128,
    });

    this.load.setPath("assets/enemy-sprites");
    this.load.image("bitey", "bitey.png");
    this.load.spritesheet("rolly", "rolly-ss.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.setPath("/assets/maps/");
    this.load.tilemapTiledJSON("BunkerLevelMap", "BunkerLevelMap.json");

    this.load.setPath("assets/tilesets/");
    this.load.image("BunkerLevelTileset", "BunkerLevelTileset.png");
    this.load.image(
      "BunkerLevelTilesetOverlay",
      "BunkerLevelTilesetOverlay.png"
    );
  }

  create() {
    this.scene.start("BunkerLevelScene");
  }
}
