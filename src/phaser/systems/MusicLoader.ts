export class MusicLoader {
    private scene: Phaser.Scene;
    private key: string;
    private isLoop: boolean;
    private volume: number;
    bgMusic: Phaser.Sound.BaseSound | undefined;
    constructor(
        scene: Phaser.Scene,
        key: string,
        isLoop: boolean,
        volume: number
    ) {
        this.scene = scene;
        this.key = key;
        this.isLoop = isLoop;
        this.volume = volume;
    }

    playMusic() {
        if (this.bgMusic && this.bgMusic.isPlaying) {
            return;
        }
        this.bgMusic = this.scene.sound.add(this.key, {
            loop: this.isLoop,
            volume: this.volume,
        });

        this.bgMusic.play();
        return this.bgMusic;
    }

    stopMusic() {
        console.log("stopped music");
        this.bgMusic?.stop();
        this.bgMusic?.destroy();
        this.bgMusic = undefined;
    }
}
