import type { Coords } from "../../systems/TiledParser";

type TriggerZone = {
    id?: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

type LevelProgress = {
    disksCollected?: number;
    enemiesDefeated?: number;
};

type EnemyState = {
    id: string;
    position: { x: number; y: number };
    interacted: boolean;
    type?: string;
    alive?: boolean;
};

class WorldState {
    private static instance: WorldState;
    private terminals: Record<
        string,
        { attempted: boolean; completed: boolean; position: Coords }
    > = {};
    private triggerZones: Record<string, TriggerZone[]> = {};
    private levelProgress: Record<string, LevelProgress> = {};
    private currentLevel: string = "";
    private enemyStates: Record<string, EnemyState> = {};
    private floppyDisks: Record<
        string,
        { colour: string; collected: boolean; position: Coords }
    > = {};

    static getInstance(): WorldState {
        if (!WorldState.instance) {
            WorldState.instance = new WorldState();
        }
        return WorldState.instance;
    }

    init(levelId: string) {
        this.currentLevel = levelId;
        if (!this.levelProgress[levelId]) {
            this.levelProgress[levelId] = {};
        }
    }

    setTriggerZones(levelId: string, zones: TriggerZone[]) {
        this.triggerZones[levelId] = zones;
    }

    getTriggerZones(): TriggerZone[] {
        return this.triggerZones[this.currentLevel] ?? [];
    }

    // enemies
    setEnemyState(id: string, state: Partial<EnemyState>) {
        if (!this.enemyStates[id]) {
            this.enemyStates[id] = {
                id,
                position: { x: 0, y: 0 },
                interacted: false,
                alive: true,
            };
        }
        this.enemyStates[id] = {
            ...this.enemyStates[id],
            ...state,
        };
    }
    getEnemyState(id: string): EnemyState | undefined {
        return this.enemyStates[id];
    }
    getAllEnemyStates(): EnemyState[] {
        return Object.values(this.enemyStates);
    }

    // terminals
    setTerminal(levelId: string, position: Coords, attempted: boolean = false) {
        this.terminals[levelId] = { completed: false, position, attempted };
    }
    getTerminal(levelId: string):
        | {
              attempted: boolean;
              completed: boolean;
              position: Coords;
          }
        | undefined {
        return this.terminals[levelId];
    }
    markTerminalComplete(levelId: string) {
        if (this.terminals[levelId]) {
            this.terminals[levelId].completed = true;
        }
    }
    isTerminalComplete(levelId: string): boolean {
        return this.terminals[levelId]?.completed ?? false;
    }

    // floppydisks
    setFloppyDisk(id: string, colour: string, position: Coords) {
        this.floppyDisks[id] = { colour, collected: false, position };
    }
    markFloppyCollected(id: string) {
        if (this.floppyDisks[id]) {
            this.floppyDisks[id].collected = true;
        }
    }
    isFloppyCollected(id: string): boolean {
        return this.floppyDisks[id]?.collected ?? false;
    }
    getCollectedDiskCount(): number {
        return Object.values(this.floppyDisks).filter((d) => d.collected)
            .length;
    }
    getAllFloppyDisks(): {
        id: string;
        colour: string;
        collected: boolean;
        position: Coords;
    }[] {
        return Object.entries(this.floppyDisks).map(([id, data]) => ({
            id,
            ...data,
        }));
    }

    // save / load all data held in this state
    getSaveData() {
        return {
            terminals: this.terminals,
            triggerZones: this.triggerZones,
            levelProgress: this.levelProgress,
            currentLevel: this.currentLevel,
            floppyDisks: this.floppyDisks,
            enemyStates: this.enemyStates,
        };
    }

    load(data: ReturnType<WorldState["getSaveData"]>) {
        this.terminals = data.terminals;
        this.triggerZones = data.triggerZones;
        this.levelProgress = data.levelProgress;
        this.currentLevel = data.currentLevel;
        this.floppyDisks = data.floppyDisks;
        this.enemyStates = data.enemyStates;
    }
}
export const worldState = WorldState.getInstance();
