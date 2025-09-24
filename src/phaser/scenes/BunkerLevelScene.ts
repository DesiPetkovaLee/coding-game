import { Scene } from "phaser";
import { mapLoader } from "../systems/mapLoader";
import { Player } from "../prefabs/characters/Player";
import { MusicLoader } from "../systems/MusicLoader";
import { CameraController } from "../systems/CameraControl";
import { RollySprite } from "../prefabs/enemies/RollySprite";
import { Spawner } from "../systems/SpriteSpawner";
import type { Terminal } from "../prefabs/interactables/Terminal";
import { FloppyDisk } from "../prefabs/interactables/FloppyDisk";
import { gameState } from "../core/GameState";
import eventBus from "../core/EventBus";

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
    // example ui overlay
    this.scene.launch("UIScene");
    this.scene.get("UIScene").events.emit("updateUI", gameState.stats);

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

    this.physics.add.collider(this.player, this.enemies, () => {
      console.log("collides");
      gameState.updateHealth(-10);
      eventBus.emit("updateUI", gameState.stats);
      console.log(gameState.stats);
    });
    this.physics.add.collider(this.player, this.terminals);
    this.physics.add.collider(this.player, this.disks);

    // Camera;
    const camControl = new CameraController(this);
    camControl.setup(this.player, map);

    // music
    if (this.input.keyboard !== null) {
      this.input.keyboard.once("keydown", () => {
        const bgMusic = new MusicLoader(this, "WakeyWakey", true, 0.2);
        bgMusic.playMusic();
      });
    }
  }

  update() {
    const player = this.player;
    if (player && this.enemies && this.terminals && this.disks) {
      player.update();

      this.enemies.forEach((enemy) => enemy.update());
      this.terminals.forEach((terminal) => terminal.update(player));
      this.disks.forEach((disk) => disk.update(player));
    }
  }
}
