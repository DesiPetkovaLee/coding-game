const SaveData = false;
//  {
//     levelId: "LabLevelMap",
//     tilesetKey: "tileset1",
//     tilesetImage: "LabLevelTileset",
//     musicKey: "WakeyWakey",
//     playerStart: { x: 100, y: 200 } as Coords,
//     floppyDisks: [
//         { id: "disk-red", colour: "red", coords: { x: 150, y: 250 } },
//         { id: "disk-blue", colour: "blue", coords: { x: 600, y: 400 } },
//     ],
//     terminal: {
//         id: "terminal-1",
//         coords: { x: 400, y: 300 },
//     },
//     enemies: [
//         { id: "bitey-1", type: "bitey", coords: { x: 300, y: 400 } },
//         { id: "rolly-2", type: "rolly", coords: { x: 600, y: 200 } },
//     ],
//     triggerZones: [
//         {
//             id: "exit-zone",
//             type: "levelExit",
//             targetLevel: "NextLevelMap",
//             x: 1200,
//             y: 300,
//             width: 64,
//             height: 64,
//         },
//     ],
// };

import { Scene } from "phaser";
import type { BaseSprite } from "../prefabs/BaseSprite";
import { Player } from "../prefabs/characters/Player";
import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";
import { Terminal } from "../prefabs/interactables/Terminal";
import { TiledParser, type Coords } from "../systems/TiledParser";
import { CameraController } from "../systems/CameraControl";
import { MusicLoader } from "../systems/MusicLoader";
import { worldState } from "../core/States/WorldState";
import { playerState } from "../core/States/PlayerState";
import { mapLoader } from "../systems/mapLoader";
import { BiteySprite } from "../prefabs/enemies/BiteySprite";
import { RollySprite } from "../prefabs/enemies/RollySprite";
import eventBus from "../core/EventBus";
import type { Interactable } from "../systems/interactableInterface";

export class LabLevelScene extends Scene {
    player: Player | undefined;
    enemies: BaseSprite[] | undefined;
    terminals: Terminal | undefined;
    disks: FloppyDisk[] | undefined;
    exitZone: Phaser.Geom.Rectangle | undefined;
    interactables: (Terminal | FloppyDisk | undefined)[] | undefined;
    constructor() {
        super("LabLevelScene");
    }

    create() {
        let levelId: string;
        let tilesetKey: string;
        let tilesetImage: string;
        let musicKey: string;

        let playerStart: Coords;

        if (SaveData) {
            const {
                levelId: mockLevelId,
                tilesetKey: mockTilesetKey,
                tilesetImage: mockTilesetImage,
                musicKey: mockMusicKey,
                playerStart: mockPlayerStart,
                enemies,
                triggerZones,
                terminal,
                floppyDisks,
            } = SaveData;

            levelId = mockLevelId;
            tilesetKey = mockTilesetKey;
            tilesetImage = mockTilesetImage;
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
            const mLoader = new mapLoader(this);
            const { map } = mLoader.loadMap(
                "LabLevelMap",
                "tileset1",
                "LabLevelTileset",
                "tileset1",
                "LabLevelTileset"
            );

            const spawnData = TiledParser.extractData(map);
            if (!spawnData) throw new Error("spawn data not found");

            levelId = "LabLevelMap";
            tilesetKey = "tileset1";
            tilesetImage = "LabLevelTileset";
            musicKey = "WakeyWakey";
            playerStart = spawnData.player;

            worldState.init(levelId);
            worldState.setTriggerZones(levelId, spawnData.triggerZones);
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
            playerState.init({ position: playerStart });
        }

        // all the following happens whether data has come from save file or using default level data
        // load map based on incoming data- will need to retrieve tileset names etc alongside user data
        const mLoader = new mapLoader(this);
        const { map, collisionLayer } = mLoader.loadMap(
            levelId,
            tilesetKey,
            tilesetImage,
            tilesetKey,
            tilesetImage
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
                let enemy: BaseSprite;
                console.log(data.type);
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
        const terminalData = worldState.getTerminal(levelId);
        this.terminals =
            terminalData && !terminalData.completed
                ? new Terminal(
                      this,
                      terminalData.position.x,
                      terminalData.position.y,
                      "terminal-1",
                      terminalData.id
                  )
                : undefined;

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
        const allEntities = [...this.enemies, this.terminals, ...this.disks];
        function isInteractable(obj: any): obj is Interactable {
            return obj && typeof obj.interact === "function";
        }
        this.interactables = allEntities.filter(isInteractable);

        eventBus.on("playerInteract", (x: number, y: number) => {
            const nearby = this.interactables?.filter(
                (i) => i && Phaser.Math.Distance.Between(x, y, i.x, i.y) < 100
            );
            nearby?.forEach((i) => i.interact?.());
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

        this.input.keyboard?.once("keydown", () => {
            const bgMusic = new MusicLoader(this, musicKey, true, 0.1);
            bgMusic.playMusic();
        });
    }
    update() {
        const player = this.player;
        if (player && this.enemies && this.terminals && this.disks) {
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
        }
    }
}
