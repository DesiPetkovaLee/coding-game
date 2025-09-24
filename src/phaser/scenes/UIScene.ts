import { Scene } from "phaser";
import eventBus from "../core/EventBus";
import { COLOURS } from "../../theme/theme";
import { gameState, type PlayerStats } from "../core/GameState";

export class UIScene extends Scene {
    private scoreText!: Phaser.GameObjects.Text;
    private healthText!: Phaser.GameObjects.Text;
    private diskText!: Phaser.GameObjects.Text;
    constructor() {
        super("UIScene");
    }
    create() {
        console.log("ui scene created");
        this.scoreText = this.add.text(
            20,
            10,
            `Score: ${gameState.stats.score}`,
            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        this.healthText = this.add.text(
            500,
            10,
            `Health: ${gameState.stats.health}`,
            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        this.diskText = this.add.text(
            250,
            10,
            `Disks: ${gameState.stats.disks}`,
            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        eventBus.on("updateUI", (stats: PlayerStats) => {
            this.scoreText.setText(`Score: ${stats.score}`);
            this.healthText.setText(`Health: ${stats.health}`);
            this.diskText.setText(`Disks: ${stats.disks}`);
        });

        // shuts down when scene closed
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventBus.off("updateUI");
        });
    }
}
