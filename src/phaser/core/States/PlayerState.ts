import eventBus from "../EventBus";

class PlayerState {
    private static instance: PlayerState;
    private intialised = false;
    private position = { x: 100, y: 200 };
    private health = 100;
    private character = "Dreamer";
    private score = 0;
    private level = 1;

    static getInstance(): PlayerState {
        if (!PlayerState.instance) {
            PlayerState.instance = new PlayerState();
        }
        return PlayerState.instance;
    }

    public getPosition() {
        return this.position;
    }
    public setPosition(value: { x: number; y: number }) {
        this.position = value;
    }
    public setHealth(amount: number) {
        this.health = this.health += amount;
    }
    public getHealth() {
        return this.health;
    }
    public setScore(amount: number) {
        this.score = this.score += amount;
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
    public getAllStats() {
        return `
    position: (${this.position.x}, ${this.position.y}),
    health: ${this.health},
    score: ${this.score},
    level: ${this.level}
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
            position: this.position,
            health: this.health,
            character: this.character,
            score: this.score,
            level: this.level,
        };
    }

    load(data: PlayerData) {
        this.position = data.position;
        this.health = data.health;
        this.character = data.character;
        this.score = data.score;
        this.level = data.level;
    }
}
type PlayerData = {
    position: { x: number; y: number };
    health: number;
    character: string;
    score: number;
    level: number;
};

export const playerState = PlayerState.getInstance();
