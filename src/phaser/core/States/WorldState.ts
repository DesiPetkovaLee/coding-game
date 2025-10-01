import type { Coords } from "../../systems/TiledParser";
import eventBus from "../EventBus";

type TriggerZone = {
    id?: string | number;
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
    id: string | number;
    position: { x: number; y: number };
    interacted: boolean;
    type?: string;
    alive?: boolean;
};

class WorldState {
    // different for each level
    private static instance: WorldState;
    private initialised = false;
    private terminals: Record<
        string,
        {
            attempted: boolean;
            completed: boolean;
            position: Coords;
            id: string | number;
        }
    > = {};
    private triggerZones: Record<string, TriggerZone[]> = {};
    private levelProgress: Record<string, LevelProgress> = {};
    private currentLevel: string | number = "";
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

    init(levelId: string | number) {
        if (this.initialised) return;
        this.currentLevel = levelId;
        if (!this.levelProgress[levelId]) {
            this.levelProgress[levelId] = {};
        }
        //  event listeners
        eventBus.on("diskCollected", this.markFloppyCollected.bind(this));
        eventBus.on("terminalCompleted", this.markTerminalComplete.bind(this));
        eventBus.on("enemyDefeated", this.markEnemyRemoved.bind(this));
        eventBus.on("enemyInteracted", this.markEnemyInteracted.bind(this));
        eventBus.on("enemyMoved", this.setEnemyPosition.bind(this));

        this.initialised = true;
    }

    // putting here to remember to add to if as we add more event listeners- but if we clear worldstate between levels we don't want to add to them
    cleanupListeners() {
        eventBus.off("diskCollected", this.markFloppyCollected);
        eventBus.off("terminalCompleted", this.markTerminalComplete);
        eventBus.off("enemyDefeated", this.markEnemyRemoved);
        eventBus.off("enemyInteracted", this.markEnemyInteracted);
        eventBus.off("enemyMoved", this.setEnemyPosition);
    }

    setTriggerZones(levelId: string, zones: TriggerZone[]) {
        this.triggerZones[levelId] = zones;
    }

    getTriggerZones(): TriggerZone[] {
        return this.triggerZones[this.currentLevel] ?? [];
    }

    // enemies
    setEnemyState(id: string | number, state: Partial<EnemyState>) {
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
    setEnemyPosition(id: string | number, newPosition: Coords) {
        return (this.enemyStates[id] = {
            ...this.enemyStates[id],
            position: newPosition,
        });
    }
    getEnemyState(id: string | number): EnemyState | undefined {
        return this.enemyStates[id];
    }
    getAllEnemyStates(): EnemyState[] {
        return Object.values(this.enemyStates);
    }
    markEnemyRemoved(id: string | number) {
        return (this.enemyStates[id] = {
            ...this.enemyStates[id],
            alive: false,
        });
    }
    markEnemyInteracted(id: string | number) {
        return (this.enemyStates[id] = {
            ...this.enemyStates[id],
            interacted: true,
        });
    }

    // terminals
    setTerminal(
        id: string | number,
        position: Coords,
        attempted: boolean = false
    ) {
        this.terminals[id] = { completed: false, position, attempted, id };
    }
    getTerminal(id: string | number):
        | {
              id: string | number;
              attempted: boolean;
              completed: boolean;
              position: Coords;
          }
        | undefined {
        return this.terminals[id];
    }
    markTerminalComplete(id: string | number) {
        if (this.terminals[id]) {
            this.terminals[id].completed = true;
        }
    }
    isTerminalComplete(id: string | number): boolean {
        return this.terminals[id]?.completed ?? false;
    }

    // floppydisks
    setFloppyDisk(id: string | number, colour: string, position: Coords) {
        this.floppyDisks[id] = { colour, collected: false, position };
    }
    markFloppyCollected(id: string | number) {
        if (this.floppyDisks[id]) {
            this.floppyDisks[id].collected = true;
        }
        console.log(this.getAllFloppyDisks());
        eventBus.emit("updateUI");
    }
    isFloppyCollected(id: string | number): boolean {
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

    resetAllCAREFUL() {
        this.initialised = false;
        this.currentLevel = "";
        this.levelProgress = {};
        this.floppyDisks = {};
        this.terminals = {};
        this.enemyStates = {};
        this.triggerZones = {};
        this.cleanupListeners();
    }
}
export const worldState = WorldState.getInstance();
