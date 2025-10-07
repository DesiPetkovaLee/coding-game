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

export type EnemyState = {
    id: string | number;
    position: { x: number; y: number };
    interacted: boolean;
    type?: string;
    alive?: boolean;
};
type levelInfo = {
    mapId: string;
    tilesetName: string;
    tilesetKey: string;
    tilesetOverlayName: string;
    tilesetOverlayKey: string;
    musicKey: string;
};

class WorldState {
    // different for each level
    private static instance: WorldState;
    private initialised = false;
    private terminal: {
        id: string | number;
        attempted: boolean;
        completed: boolean;
        position: Coords;
    } | null = null;
    private triggerZones: TriggerZone[] = [];
    private levelId: string | number = "";
    private enemyStates: Record<string | number, EnemyState> = {};
    private floppyDisks: Record<
        string,
        { colour: string; collected: boolean; position: Coords }
    > = {};
    private levelInfo: levelInfo = {
        mapId: "",
        tilesetName: "",
        tilesetKey: "",
        tilesetOverlayName: "",
        tilesetOverlayKey: "",
        musicKey: "",
    };
    static getInstance(): WorldState {
        if (!WorldState.instance) {
            WorldState.instance = new WorldState();
        }
        return WorldState.instance;
    }

    init(levelId: string | number) {
        if (this.initialised) return;
        this.levelId = levelId;
        //  event listeners
        eventBus.on("diskCollected", this.markFloppyCollected.bind(this));
        eventBus.on("terminalCompleted", this.markTerminalComplete.bind(this));
        eventBus.on("enemyDefeated", this.markEnemyRemoved.bind(this));
        eventBus.on("enemyInteracted", this.markEnemyInteracted.bind(this));
        // eventBus.on("enemyMoved", this.setEnemyPosition.bind(this));

        this.initialised = true;
    }

    // putting here to remember to add to if as we add more event listeners- but if we clear worldstate between levels we don't want to add to them
    cleanupListeners() {
        eventBus.off("diskCollected", this.markFloppyCollected);
        eventBus.off("terminalCompleted", this.markTerminalComplete);
        eventBus.off("enemyDefeated", this.markEnemyRemoved);
        eventBus.off("enemyInteracted", this.markEnemyInteracted);
        // eventBus.off("enemyMoved", this.setEnemyPosition);
    }

    setTriggerZones(zones: TriggerZone[]) {
        this.triggerZones = zones;
    }

    getTriggerZones(): TriggerZone[] {
        return this.triggerZones;
    }

    // levelInfo
    setLevelInfo(
        mapId: string,
        tilesetName: string,
        tilesetKey: string,
        tilesetOverlayName: string,
        tilesetOverlayKey: string,
        musicKey: string
    ) {
        this.levelInfo = {
            mapId,
            tilesetName,
            tilesetKey,
            tilesetOverlayName,
            tilesetOverlayKey,
            musicKey,
        };
    }
    getLevelInfo(): levelInfo {
        return this.levelInfo;
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
    // setEnemyPosition(id: string | number, newPosition: Coords) {
    //     return (this.enemyStates[id] = {
    //         ...this.enemyStates[id],
    //         position: newPosition,
    //     });
    // }
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
        attempted: boolean = false,
        completed: boolean = false
    ) {
        this.terminal = {
            id,
            position,
            attempted,
            completed,
        };
    }

    getTerminal(): typeof this.terminal {
        return this.terminal;
    }

    markTerminalComplete() {
        if (this.terminal) {
            this.terminal.completed = true;
        }
    }

    isTerminalComplete(): boolean {
        return this.terminal?.completed ?? false;
    }

    // floppydisks
    setFloppyDisk(
        id: string | number,
        colour: string,
        position: Coords,
        isCollected: boolean
    ) {
        this.floppyDisks[id] = { colour, collected: isCollected, position };
    }
    markFloppyCollected(id: string | number) {
        if (this.floppyDisks[id]) {
            this.floppyDisks[id].collected = true;
        }
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
        // don't want to save enemy position data
        const partialEnemyStates: Record<
            string | number,
            Omit<EnemyState, "position">
        > = {};
        for (const [id, enemy] of Object.entries(this.enemyStates)) {
            partialEnemyStates[id] = {
                id: enemy.id,
                interacted: enemy.interacted,
                alive: enemy.alive,
                type: enemy.type,
            };
        }
        return {
            terminals: this.terminal,
            levelId: this.levelId,
            floppyDisks: this.floppyDisks,
            enemyStates: partialEnemyStates,
            levelInfo: this.levelInfo,
        };
    }

    resetAllCAREFUL() {
        this.initialised = false;
        this.levelId = "";
        this.floppyDisks = {};
        this.terminal = null;
        this.enemyStates = {};
        this.triggerZones = [];
        this.levelInfo = {
            mapId: "",
            tilesetName: "",
            tilesetKey: "",
            tilesetOverlayName: "",
            tilesetOverlayKey: "",
            musicKey: "",
        };
        this.cleanupListeners();
    }
}
export const worldState = WorldState.getInstance();
