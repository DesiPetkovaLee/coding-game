import { Scene } from "phaser";

export class PreloadScene extends Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        // this.load.audio("menu", "/assets/music/Main-Menu.wav");
        this.load.audio("WakeyWakey", "/assets/music/WakeyWakey.mp3");

        // main characters
        this.load.setPath("/assets/character-sprites/");
        this.load.spritesheet("player-sheet", "dreamer-ss-directions.png", {
            frameHeight: 128,
            frameWidth: 128,
        });

        // enemies
        this.load.setPath("assets/enemy-sprites");
        this.load.spritesheet("rolly", "rolly-ss.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.spritesheet("bitey", "bitey-anim-ss.png", {
            frameWidth: 70,
            frameHeight: 100,
        });

        // interactables
        this.load.setPath("/assets/objects/");
        this.load.image("floppy-red", "floppy-red.png");
        this.load.image("floppy-green", "floppy-green.png");
        this.load.image("floppy-blue", "floppy-blue.png");
        this.load.image("terminal", "terminal-temp.png");

        // maps and tilesets
        this.load.setPath("/assets/maps/");
        this.load.tilemapTiledJSON("BunkerLevelMap", "BunkerLevelMap.tmj");
        this.load.tilemapTiledJSON("LabLevelMap", "LabLevelMap.tmj");

        this.load.setPath("assets/tilesets/");
        this.load.image("BunkerLevelTileset", "BunkerLevelTileset.png");
        this.load.image(
            "BunkerLevelTilesetOverlay",
            "BunkerLevelTilesetOverlay.png"
        );
        this.load.image("LabLevelTileset", "LabLevelTileset.png");
    }

    create() {
        this.scene.start("LabLevelScene");
    }
}
