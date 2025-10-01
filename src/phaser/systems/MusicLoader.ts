export class MusicLoader {
    private scene: Phaser.Scene;
    private key: string;
    private isLoop: boolean;
    private volume: number;
    private isMuted: boolean = false;
    bgMusic: Phaser.Sound.BaseSound | undefined;
    constructor(
        scene: Phaser.Scene,
        key: string,
        isLoop: boolean,
        volume: number,
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
            volume: this.isMuted ? 0 : this.volume,
        });

        this.bgMusic.play();
        return this.bgMusic;
    }

    stopMusic() {
        this.bgMusic?.stop();
        this.bgMusic?.destroy();
        this.bgMusic = undefined;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.bgMusic) {
            (this.bgMusic as any).setVolume(this.isMuted ? 0 : this.volume);
        }
    }

    isCurrentlyMuted(): boolean {
        return this.isMuted;
    }

    setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
        if (this.bgMusic && !this.isMuted) {
            (this.bgMusic as any).setVolume(this.volume);
        }
        console.log(`volume set to ${this.volume}`);
    }

    getVolume(): number {
        return this.volume;
    }
}
