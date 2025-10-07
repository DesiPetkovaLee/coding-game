import type { Coords } from "../../systems/TiledParser";
import eventBus from "../EventBus";

class PlayerState {
    private static instance: PlayerState;
    private intialised: boolean = false;
    private position: Coords = { x: 100, y: 200 };
    private health: number = 100;
    private character: string = "Dreamer";
    private score: number = 0;
    private level: number = 1;
    private lives: number = 3;

    static getInstance(): PlayerState {
        if (!PlayerState.instance) {
            PlayerState.instance = new PlayerState();
        }
        return PlayerState.instance;
    }
    public getCharacter() {
        return this.character;
    }

    public getPosition() {
        return this.position;
    }
    public setPosition(value: { x: number; y: number }) {
        this.position = value;
    }
    public setHealth(amount: number) {
        this.health = this.health += amount;
        eventBus.emit("updateUI");
    }
    public getHealth() {
        return this.health;
    }
    public setScore(amount: number) {
        this.score = this.score += amount;
        eventBus.emit("updateUI");
    }
    public getScore() {
        return this.score;
    }
    public getLevel() {
        return this.level;
    }
    public setLevel(amount: number) {
        this.level = this.level += amount;
    }
    public getLives() {
        return this.lives;
    }
    public setLives(amount: number) {
        return (this.lives += amount);
    }
    public getAllStats() {
        return `
    position: (${this.position.x}, ${this.position.y}),
    health: ${this.health},
    score: ${this.score},
    level: ${this.level},
    lives: ${this.lives}
  `;
    }
    init(defaults?: Partial<PlayerData>) {
        if (!this.intialised) {
            eventBus.on("playerMoved", this.setPosition.bind(this));
            eventBus.on("playerDamaged", this.setHealth.bind(this));
            eventBus.on("playerScored", (amount: number) => {
                if (typeof amount === "number") {
                    this.setScore(amount);
                }
            });

            this.intialised = true;
        }
        // defaults - will ideally never use as should read tiled data if no save file
        this.position = defaults?.position ?? { x: 100, y: 200 };
        this.health = defaults?.health ?? 100;
        this.character = defaults?.character ?? "Dreamer";
        this.score = defaults?.score ?? 0;
        this.level = defaults?.level ?? 1;
    }

    getSaveData() {
        return {
            // position: this.position,
            health: this.health,
            character: this.character,
            score: this.score,
            level: this.level,
            lives: this.lives,
        };
    }

    load(data: PlayerData) {
        this.position = data.position;
        this.health = data.health;
        this.character = data.character;
        this.score = data.score;
        this.level = data.level;
        this.lives = data.lives;
    }
}
type PlayerData = {
    position: { x: number; y: number };
    health: number;
    character: string;
    score: number;
    level: number;
    lives: number;
};

export const playerState = PlayerState.getInstance();
