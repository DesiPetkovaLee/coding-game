import { Scene } from "phaser";
import eventBus from "../core/EventBus";
import { gameState, type PlayerStats } from "../core/GameState";

export class UIScene extends Scene {
    private scoreText!: Phaser.GameObjects.Text;
    private healthText!: Phaser.GameObjects.Text;
    constructor() {
        super("UIScene");
    }
    create() {
        console.log("ui scene created");
        this.scoreText = this.add.text(
            20,
            20,
            `Score: ${gameState.stats.score}`,
            {
                fontSize: "24px",
                color: "#fff",
            }
        );

        this.healthText = this.add.text(
            500,
            10,
            `Health: ${gameState.stats.health}`,
            {
                fontSize: "24px",
                color: "#fff",
            }
        );

        eventBus.on("updateUI", (stats: PlayerStats) => {
            this.scoreText.setText(`Score: ${stats.score}`);
            this.healthText.setText(`Health: ${stats.health}`);
        });

        // shuts down when scene closed
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventBus.off("updateUI");
        });
    }
}
