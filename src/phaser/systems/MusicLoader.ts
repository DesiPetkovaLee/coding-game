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
        console.log('stopped music');
        this.bgMusic?.stop();
        this.bgMusic?.destroy();
        this.bgMusic = undefined;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.bgMusic) {
            this.bgMusic.setVolume(this.isMuted ? 0 : this.volume);
        }
        console.log(this.isMuted ? 'music muted' : 'music unmuted');
    }

    mute() {
        this.isMuted = true;
        if (this.bgMusic) {
            this.bgMusic.setVolume(0);
        }
        console.log('music muted');
    }

    unmute() {
        this.isMuted = false;
        if (this.bgMusic) {
            this.bgMusic.setVolume(this.volume);
        }
        console.log('music unmuted');
    }

    isCurrentlyMuted(): boolean {
        return this.isMuted;
    }
}
