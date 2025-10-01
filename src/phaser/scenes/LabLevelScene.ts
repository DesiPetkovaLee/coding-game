const SaveData = false;

const defaultLevelData = {
    defaultlevelId: "LabLevelMap",
    defaultmapId: "LabLevelMap",
    defaulttilesetName: "tileset1",
    defaulttilesetKey: "LabLevelTileset",
    defaulttilesetOverlayName: "tileset1",
    defaulttilesetOverlayKey: "LabLevelTileset",
    defaultmusicKey: "WakeyWakey",
};

import { Scene } from "phaser";
import { Player } from "../prefabs/characters/Player";
import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";
import { Terminal } from "../prefabs/interactables/Terminal";
import { TiledParser, type Coords } from "../systems/TiledParser";
import { CameraController } from "../systems/CameraControl";
import { MusicLoader } from "../systems/MusicLoader";
import { worldState } from "../core/state/WorldState";
import { playerState } from "../core/state/PlayerState";
import { mapLoader } from "../systems/mapLoader";
import { BiteySprite } from "../prefabs/enemies/BiteySprite";
import { RollySprite } from "../prefabs/enemies/RollySprite";
import eventBus from "../core/EventBus";
import type { BaseEnemy } from "../prefabs/enemies/BaseEnemy";

export class LabLevelScene extends Scene {
    player: Player | undefined;
    enemies: BaseEnemy[] | undefined;
    terminals: Terminal | undefined;
    disks: FloppyDisk[] | undefined;
    exitZone: Phaser.Geom.Rectangle | undefined;
    interactables: (BaseEnemy | Terminal | FloppyDisk)[] | undefined;
    musicLoader: MusicLoader | undefined;
    constructor() {
        super("LabLevelScene");
    }

    create() {
        if (!this.scene.isActive("UIScene")) {
            this.scene.launch("UIScene");
            this.scene.get("UIScene").events.emit("updateUI");
        }
        let mapId: string;
        let levelId: string;
        let tilesetName: string;
        let tilesetKey: string;
        let tilesetOverlayName: string;
        let tilesetOverlayKey: string;
        let musicKey: string;
        let playerStart: Coords;

        if (SaveData) {
            const {
                levelId: mockLevelId,
                mapId: mockMapId,
                tilesetName: mockTilesetName,
                tilesetKey: mockTilesetKey,
                tilesetOverlayName: mockTilesetOverlayName,
                tilesetOverlayKey: mockTilesetOverlayKey,
                musicKey: mockMusicKey,
                playerStart: mockPlayerStart,
                enemies,
                triggerZones,
                terminal,
                floppyDisks,
            } = SaveData;

            levelId = mockLevelId;
            mapId = mockMapId;
            tilesetName = mockTilesetName;
            tilesetKey = mockTilesetKey;
            tilesetOverlayName = mockTilesetOverlayName;
            tilesetOverlayKey = mockTilesetOverlayKey;
            musicKey = mockMusicKey;
            playerStart = mockPlayerStart;

            worldState.init(levelId);
            worldState.setTriggerZones(levelId, triggerZones);
            worldState.setTerminal(levelId, terminal.coords);
            floppyDisks.forEach((d) =>
                worldState.setFloppyDisk(d.id, d.colour, d.coords)
            );
            enemies.forEach((e) =>
                worldState.setEnemyState(e.id, {
                    position: e.coords,
                    type: e.type,
                })
            );
            playerState.init({ position: playerStart });
        } else {
            // would need to be getting defaults here- get tilemap json, tileset, keys for default
            mapId = defaultLevelData.defaultmapId;
            levelId = defaultLevelData.defaultlevelId;
            tilesetName = defaultLevelData.defaulttilesetName;
            tilesetKey = defaultLevelData.defaulttilesetKey;
            tilesetOverlayName = defaultLevelData.defaulttilesetOverlayName;
            tilesetOverlayKey = defaultLevelData.defaulttilesetOverlayKey;
            musicKey = defaultLevelData.defaultmusicKey;

            const mLoader = new mapLoader(this);
            const { map } = mLoader.loadMap(
                mapId,
                tilesetName,
                tilesetKey,
                tilesetOverlayName,
                tilesetOverlayKey
            );

            const spawnData = TiledParser.extractData(map);
            if (!spawnData) throw new Error("spawn data not found");

            playerStart = spawnData.player;

            worldState.init(levelId);
            worldState.setTriggerZones(spawnData.triggerZones);
            worldState.setTerminal(levelId, spawnData.terminals[0].coords);
            spawnData.floppyDisks.forEach((d) =>
                worldState.setFloppyDisk(d.id, d.colour, d.coords)
            );
            spawnData.enemies.forEach((e) =>
                worldState.setEnemyState(e.id, {
                    position: e.coords,
                    type: e.type,
                })
            );
            //
            // would want to keep this in if its the first/ only scene!
            //
            // playerState.init({ position: playerStart });
            playerState.setPosition(playerStart);
        }

        // all the following happens whether data has come from save file or using default level data
        // load map based on incoming data- will need to retrieve tileset names etc alongside user data

        const mLoader = new mapLoader(this);
        const { map, collisionLayer } = mLoader.loadMap(
            mapId,
            tilesetName,
            tilesetKey,
            tilesetOverlayName,
            tilesetOverlayKey
        );

        // actual spawning of players and enemies
        // player

        const { x, y } = playerState.getPosition();
        this.player = new Player(this, x, y);
        // enemies- can be added to with diff types and we could make an enemy factory to slim down this logic
        this.enemies = worldState
            .getAllEnemyStates()
            .filter((e) => e.alive !== false)
            .map((data) => {
                let enemy: BaseEnemy;
                switch (data.type) {
                    case "bitey":
                        enemy = new BiteySprite(
                            this,
                            data.position.x,
                            data.position.y,
                            data.type,
                            data.id
                        );
                        break;
                    case "rolly":
                        enemy = new RollySprite(
                            this,
                            data.position.x,
                            data.position.y,
                            data.type,
                            data.id
                        );
                        break;
                    default:
                        enemy = new RollySprite(
                            this,
                            data.position.x,
                            data.position.y,
                            (data.type = "rolly"),
                            data.id
                        );
                        break;
                }

                enemy.id = data.id;
                enemy.interacted = data.interacted;
                enemy.alive = data.alive;
                return enemy;
            });
        const terminalData = worldState.getTerminal();
        this.terminals =
            terminalData && !terminalData.completed
                ? new Terminal(
                      this,
                      terminalData.position.x,
                      terminalData.position.y,
                      "terminal",
                      terminalData.id
                  )
                : undefined;
        console.log(this.terminals?.id);

        this.disks = worldState
            .getAllFloppyDisks()
            .filter((d) => !d.collected)
            .map((d) => {
                const colour = d.colour ?? "default";
                const textureMap: Record<string, string> = {
                    red: "floppy-red",
                    green: "floppy-green",
                    blue: "floppy-blue",
                    default: "floppy-red",
                };
                const texture = textureMap[colour] ?? textureMap.default;
                return new FloppyDisk(
                    this,
                    d.position.x,
                    d.position.y,
                    texture,
                    d.id,
                    d.colour
                );
            });
        // exit zone
        console.log(worldState.getTriggerZones());
        const exitZoneData = worldState.getTriggerZones();
        console.log(exitZoneData[0]);
        this.exitZone = new Phaser.Geom.Rectangle(
            exitZoneData[0].x,
            exitZoneData[0].y,
            exitZoneData[0].width,
            exitZoneData[0].height
        );
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

        // collisions
        this.physics.add.collider(this.player, this.disks);
        this.physics.add.collider(this.player, collisionLayer);
        this.physics.add.collider(this.player, this.enemies);
        this.physics.add.collider(this.enemies, collisionLayer);
        if (this.terminals) {
            this.physics.add.collider(this.player, this.terminals);
            this.physics.add.collider(this.enemies, this.terminals);
            this.physics.add.collider(this.enemies, this.disks);
        }
        this.enemies.forEach((enemy) =>
            enemy.getBody().setCollideWorldBounds(true)
        );
        this.player.getBody().setCollideWorldBounds(true);

        // music and cameras
        const camControl = new CameraController(this);
        camControl.setup(this.player, map);
        this.musicLoader = new MusicLoader(this, musicKey, true, 0.1);
        this.input.keyboard?.once("keydown", () => {
            this.musicLoader?.playMusic();
        });

        // 'save' data
        const space = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        space?.on("down", () => {
            const worldSaveData = worldState.getSaveData();
            console.log(
                "WorldState Save:\n",
                JSON.stringify(worldSaveData, null, 2)
            );
            const playerStateData = playerState.getSaveData();
            console.log(
                "playerStateData Save:\n",
                JSON.stringify(playerStateData, null, 2)
            );
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
            // this.terminals.update(player);

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

            // this is essentially level ending section- need to reset all that needs resetting at the end of it
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
                    // might put these inside of phaser scene shutdown instead if it gets bloated
                    worldState.resetAllCAREFUL();
                    eventBus.emit("updateUI");
                    this.musicLoader?.stopMusic();
                    console.log("start next scene");
                    this.scene.start("BunkerLevelScene");
                }
            }
        }
    }
}
