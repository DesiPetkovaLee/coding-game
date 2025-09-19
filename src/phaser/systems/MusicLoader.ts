export class MusicLoader {
  private scene: Phaser.Scene;
  private key: string;
  private isLoop: boolean;
  private volume: number;

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
    const bgMusic = this.scene.sound.add(this.key, {
      loop: this.isLoop,
      volume: this.volume,
    });
    bgMusic.play();
    return bgMusic;
  }
}
