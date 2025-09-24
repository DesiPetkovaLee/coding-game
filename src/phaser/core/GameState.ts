export type PlayerStats = {
    level: number;
    score: number;
    character: string;
    health: number;
    inventory: string[];
};

class GameState {
    private static instance: GameState;
    public stats: PlayerStats;
    public preferences: { musicVolume: number; theme: string };

    private constructor() {
        this.stats = {
            level: 1,
            score: 0,
            character: "Dreamer",
            health: 100,
            inventory: [],
        };

        this.preferences = {
            musicVolume: 0.8,
            theme: "dark",
        };
    }

    static getInstance(): GameState {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }

    updateScore(amount: number) {
        this.stats.score += amount;
        if (this.stats.score >= 1000) {
            this.stats.level++;
            this.stats.score = 0;
        }
    }

    updateHealth(amount: number) {
        this.stats.health += amount;
        if (this.stats.health >= 1000) {
            this.stats.level++;
            this.stats.health = 0;
        }
    }
}

export const gameState = GameState.getInstance();
