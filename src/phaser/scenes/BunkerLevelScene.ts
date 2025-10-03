import { Scene } from "phaser";
import { mapLoader } from "../systems/mapLoader";
import { Player } from "../prefabs/characters/Player";
import { MusicLoader } from "../systems/MusicLoader";
import { CameraController } from "../systems/CameraControl";
import { Spawner } from "../systems/SpriteSpawner";
import type { Terminal } from "../prefabs/interactables/Terminal";
import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";
import eventBus from "../core/EventBus";
import { playerState } from "../core/state/PlayerState";
import { worldState } from "../core/state/WorldState";
import type { BaseEnemy } from "../prefabs/enemies/BaseEnemy";

export class BunkerLevelScene extends Scene {
    player: Player | undefined;
    enemies: BaseEnemy[] | undefined;
    terminals: Terminal | undefined;
    disks: FloppyDisk[] | undefined;
    exitZone: Phaser.Geom.Rectangle | undefined;
    interactables: (BaseEnemy | Terminal | FloppyDisk)[] | undefined;
    musicLoader: MusicLoader | undefined;
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
            worldState.setFloppyDisk(
                disk.id,
                disk.colour,
                disk.getCoords(),
                false
            );
        });
        // interactions
        // if we add interactables they need to be added here
        const allEntities = [
            ...this.enemies,
            ...(this.terminals ? [this.terminals] : []),
            ...this.disks,
        ].filter((e): e is BaseEnemy | Terminal | FloppyDisk => !!e);
        // filtering based on if they have a function called interact
        this.interactables = allEntities.filter(
            (e): e is BaseEnemy | Terminal | FloppyDisk =>
                typeof e.interact === "function"
        );
        // when the interact event is emitted from player checks if any interactables are near and if so calls their interact function
        eventBus.on("playerInteract", (x: number, y: number) => {
            const nearby = this.interactables?.filter(
                (i) => Phaser.Math.Distance.Between(x, y, i.x, i.y) < 100
            );

            nearby?.forEach((i) => i.interact());
        });

        // player
        // collisions
        this.player.getBody().setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collisionLayer);

        this.physics.add.collider(this.player, this.enemies, () => {
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

        this.exitZone = spawner.exitZone();
        if (this.exitZone) {
            this.add
                .rectangle(
                    this.exitZone.x,
                    this.exitZone.y,
                    this.exitZone.width,
                    this.exitZone.height,
                    0xff0000,
                    0.3
                )
                .setOrigin(0, 0);
        }
        // Camera;
        const camControl = new CameraController(this);
        camControl.setup(this.player, map);

        // music
        this.musicLoader = new MusicLoader(this, "WakeyWakey", true, 0.1);
        this.input.keyboard?.once("keydown", () => {
            this.musicLoader?.playMusic();
        });
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
            this.terminals.update(player);

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
                    worldState.resetAllCAREFUL();
                    this.musicLoader?.stopMusic();
                    eventBus.emit("updateUI");
                    this.scene.start("LabLevelScene");
                }
            }
        }
    }
}
