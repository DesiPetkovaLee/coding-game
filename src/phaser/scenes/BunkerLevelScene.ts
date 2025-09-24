import { Scene } from "phaser";
import { mapLoader } from "../systems/mapLoader";
import { Player } from "../prefabs/characters/Player";
import { MusicLoader } from "../systems/MusicLoader";
import { CameraController } from "../systems/CameraControl";
import { RollySprite } from "../prefabs/enemies/RollySprite";
import { Spawner } from "../systems/SpriteSpawner";
import type { Terminal } from "../prefabs/interactables/Terminal";
import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";

export class BunkerLevelScene extends Scene {
    player: Player | undefined;
    // rolly: RollySprite | undefined;
    enemies: RollySprite[] | undefined;
    terminals: Terminal[] | undefined;
    disks: FloppyDisk[] | undefined;
    constructor() {
        super("BunkerLevelScene");
    }

    create() {
        // map load
        const mLoader = new mapLoader(this);
        const { map, collisionLayer } = mLoader.loadMap(
            "BunkerLevelMap",
            "BunkerLevelTileset",
            "BunkerLevelTileset",
            "BunkerLevelTilesetOverlay",
            "BunkerLevelTilesetOverlay"
        );

        const spawner = new Spawner(this, map);
        const { player, enemies, terminals, disks } = spawner.spawnEntities();
        this.player = player;
        this.enemies = enemies;
        this.terminals = terminals;
        this.disks = disks;

        // player
        this.player.getBody().setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collisionLayer);

        // Camera;
        const camControl = new CameraController(this);
        camControl.setup(this.player, map);

        // thinker load- no additional fields, just want to see him
        // const thinker = this.physics.add.sprite(1200, 2900, "thinker");
        // thinker.setScale(1.25);
        // thinker.setCollideWorldBounds(true);

        // music
        if (this.input.keyboard !== null) {
            this.input.keyboard.once("keydown", () => {
                const bgMusic = new MusicLoader(this, "WakeyWakey", true, 0.5);
                bgMusic.playMusic();
            });
        }
    }

    update() {
        this.player?.update();
    }
}

// // --- Groups ---
// this.marvils = this.physics.add.staticGroup();
// this.rollies = this.physics.add.group();

// for (let i = 0; i < 6; i++) {
//   let marvilY = 0;
//   let randomX = Math.ceil(Math.random() * 3000);
//   let randomY = Math.ceil(Math.random() * 3000);

//   if (i < 2) marvilY = 2450 - i * 100;
//   else if (i < 4) marvilY = 1750 - i * 100;
//   else marvilY = 1050 - i * 100;

//   const marvil = this.marvils.create(2950, marvilY, "marvil");

// this.physics.add.collider(this.player, collisionLayer);
