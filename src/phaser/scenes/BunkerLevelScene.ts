import { Scene } from "phaser";
import { mapLoader } from "../systems/mapLoader";
import { Player } from "../prefabs/Player";
import { MusicLoader } from "../systems/MusicLoader";
import { CameraController } from "../systems/CameraControl";

export class BunkerLevelScene extends Scene {
    player!: any;
    playerTwo: Player | undefined;
    constructor() {
        super("BunkerLevelScene");
    }

    create() {
        // map load
        const mLoader = new mapLoader(this);
        const { map, collisionLayer } = mLoader.loadMap(
            "BunkerLevelMap",
            "level-0-map.tsx",
            "BunkerLevelTileset"
        );

        // player load
        this.playerTwo = new Player(this, 1300, 2900);
        this.playerTwo.setScale(1);
        this.playerTwo.getBody().setCollideWorldBounds(true);

        //
        this.physics.add.collider(this.playerTwo, collisionLayer);

        // Camera
        const camControl = new CameraController(this);
        camControl.setup(this.playerTwo, map);

        // thinker load- no additional fields, just want to see him
        this.player = this.physics.add.sprite(1200, 2900, "thinker");
        this.player.setScale(1.25);
        this.player.setCollideWorldBounds(true);

        // music
        // if (this.input.keyboard !== null) {
        //     this.input.keyboard.once("keydown", () => {
        //         const bgMusic = new MusicLoader(this, "menu", true, 0.5);
        //         bgMusic.playMusic();
        //     });
        // }
    }

    update() {
        this.playerTwo?.update();
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
