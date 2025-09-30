import { Scene } from "phaser";
import eventBus from "../core/EventBus";
import { COLOURS } from "../../theme/theme";
import { gameState, type PlayerStats } from "../core/States/GameState";

export class UIScene extends Scene {
    private scoreText!: Phaser.GameObjects.Text;
    private healthText!: Phaser.GameObjects.Text;
    private diskText!: Phaser.GameObjects.Text;
    diskDisplay: Phaser.GameObjects.Rectangle | undefined;
    diskIcons: Phaser.GameObjects.Image[] | undefined;
    constructor() {
        super("UIScene");
    }
    create() {
        console.log("ui scene created");

        this.diskText = this.add.text(
            250,
            10,
            `Disks: ${gameState.stats.disks.length}/ 4`,
            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        this.scoreText = this.add.text(
            500,
            10,
            `Score: ${gameState.stats.score}`,
            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        this.healthText = this.add.text(
            750,
            10,
            `Health: ${gameState.stats.health}`,
            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        // background for disks
        const padding = 10;
        const diskSize = 32;
        this.diskDisplay = this.add
            .rectangle(padding, padding, 0, diskSize + padding * 2, 0x000000)
            .setOrigin(0, 0);

        eventBus.on("updateUI", (stats: PlayerStats) => {
            this.scoreText.setText(`Score: ${stats.score}`);
            this.healthText.setText(`Health: ${stats.health}`);
            this.diskText.setText(`Disks: ${stats.disks.length}/4`);

            // disk display
            this.diskIcons = [];
            stats.disks.forEach((colour, index) => {
                const textureKey = `floppy-${colour}`;
                const x = padding + index * (diskSize + padding);
                const y = padding + diskSize / 2;

                const diskImage = this.add
                    .image(x, y, textureKey)
                    .setDisplaySize(diskSize, diskSize)
                    .setOrigin(0, 0.5);

                this.diskIcons!.push(diskImage);
            });
            // resize black bg to fit disks
            const totalWidth = stats.disks.length * (diskSize + padding);
            this.diskDisplay!.setSize(totalWidth, diskSize);
        });

        // shuts down when scene closed
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventBus.off("updateUI");
        });
    }
}
