import { Scene } from "phaser";
import eventBus from "../core/EventBus";
import { COLOURS } from "../../theme/theme";
import { playerState } from "../core/state/PlayerState";
import { worldState } from "../core/state/WorldState";

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
        this.diskText = this.add.text(
            250,
            10,
            `Disks: ${worldState.getCollectedDiskCount()}/4`,

            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        this.scoreText = this.add.text(
            500,
            10,
            `Score: ${playerState.getScore()}`,
            {
                fontSize: "24px",
                color: COLOURS.cyan,
                backgroundColor: COLOURS.black1,
            }
        );

        this.healthText = this.add.text(
            750,
            10,
            `Health: ${playerState.getHealth()}`,

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

        eventBus.on("updateUI", () => {
            this.scoreText.setText(`Score: ${playerState.getScore()}`);
            this.healthText.setText(`Health: ${playerState.getHealth()}`);
            this.diskText.setText(
                `Disks: ${worldState.getCollectedDiskCount()}/4`
            );

            // disk display
            this.diskIcons?.forEach((icon) => icon.destroy());
            this.diskIcons = [];

            const collectedDisks = worldState
                .getAllFloppyDisks()
                .filter((d: { collected: boolean }) => d.collected);
            collectedDisks.forEach(
                (disk: { colour: string }, index: number) => {
                    const textureKey = `floppy-${disk.colour}`;
                    const x = padding + index * (diskSize + padding);
                    const y = padding + diskSize / 2;

                    const diskImage = this.add
                        .image(x, y, textureKey)
                        .setDisplaySize(diskSize, diskSize)
                        .setOrigin(0, 0.5);

                    this.diskIcons!.push(diskImage);
                }
            );

            const totalWidth = collectedDisks.length * (diskSize + padding);
            this.diskDisplay!.setSize(totalWidth, diskSize);
        });

        // shuts down when scene closed
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventBus.off("updateUI");
        });
    }
}
