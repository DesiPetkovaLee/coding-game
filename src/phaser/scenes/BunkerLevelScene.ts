import { Scene } from "phaser";
import { mapLoader } from "../systems/mapLoader";
import { Player } from "../prefabs/characters/Player";
import { MusicLoader } from "../systems/MusicLoader";
import { CameraController } from "../systems/CameraControl";
import { Spawner } from "../systems/SpriteSpawner";
import type { Terminal } from "../prefabs/interactables/Terminal";
import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";
import eventBus from "../core/EventBus";
import type { BaseSprite } from "../prefabs/BaseSprite";
import { playerState } from "../core/States/PlayerState";
import { worldState } from "../core/States/WorldState";

export class BunkerLevelScene extends Scene {
    player: Player | undefined;
    enemies: BaseSprite[] | undefined;
    terminals: Terminal[] | undefined;
    disks: FloppyDisk[] | undefined;
    exitZone: Phaser.Geom.Rectangle | undefined;
    constructor() {
        super("BunkerLevelScene");
    }

    create() {
        // example ui overlay
        this.scene.launch("UIScene");
        this.scene.get("UIScene").events.emit("updateUI");

        playerState.init();
        worldState.init("BunkerLevelScene");

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

        this.disks.forEach((disk) => {
            worldState.setFloppyDisk(disk.id, disk.colour, disk.getCoords());
        });
        this.exitZone = spawner.exitZone();
        // player
        this.player.getBody().setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collisionLayer);

        this.physics.add.collider(this.player, this.enemies, () => {
            console.log("collides");
            eventBus.emit("playerDamaged", -10);
            eventBus.emit("updateUI");
        });
        this.physics.add.collider(this.player, this.terminals);
        this.physics.add.collider(this.player, this.disks);
        this.physics.add.collider(this.enemies, collisionLayer);
        this.physics.add.collider(this.enemies, this.terminals);

        this.enemies.forEach((enemy) =>
            enemy.getBody().setCollideWorldBounds(true)
        );

        // Camera;
        const camControl = new CameraController(this);
        camControl.setup(this.player, map);

        // music
        if (this.input.keyboard !== null) {
            this.input.keyboard.once("keydown", () => {
                const bgMusic = new MusicLoader(this, "WakeyWakey", true, 0.1);
                bgMusic.playMusic();
            });
        }
    }

    update() {
        const player = this.player;
        if (
            player &&
            this.enemies &&
            this.terminals &&
            this.disks &&
            this.exitZone
        ) {
            player.update();

            this.enemies.forEach((enemy) => enemy.update());
            this.terminals.forEach((terminal) => terminal.update(player));

            // removing clicked disks
            this.disks = this.disks.filter((disk) => {
                if (disk.toDelete) {
                    disk.destroy();
                    return false;
                }

                disk.update(player);
                return true;
            });

            this.enemies = this.enemies.filter((enemy) => {
                if (enemy.toDelete) {
                    enemy.destroy();
                    return false;
                }
                enemy.update();
                return true;
            });

            // if player walks into trigger zone and has collected all disks, starts next scene
            const playerBounds = player.getBounds();

            if (
                Phaser.Geom.Intersects.RectangleToRectangle(
                    playerBounds,
                    this.exitZone
                )
            ) {
                if (worldState.getCollectedDiskCount() == 4) {
                    console.log(
                        JSON.stringify(worldState.getSaveData(), null, 2)
                    );
                    console.log("------------------");

                    console.log(
                        JSON.stringify(playerState.getSaveData(), null, 2)
                    );
                    console.log("start next scene");
                }
            }
        }
    }
}
