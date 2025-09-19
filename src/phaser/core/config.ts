import Phaser from "phaser";
import { PreloadScene } from "../scenes/PreloadScene";
import { BunkerLevelScene } from "../scenes/BunkerLevelScene";

export const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    parent: "game-container",
    backgroundColor: "#deded1",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    scene: [PreloadScene, BunkerLevelScene],
    fps: {
        limit: 30,
    },
};

// const StartGame = (parent) => {
//   console.log("game is being created now with " + parent);
//   return new Phaser.Game({ ...config, parent });
// };

// export default StartGame;
// type: Phaser.AUTO,
//             width: 800,
//             height: 600,
//             parent: host.current!,
//             backgroundColor: 0x0b1020,
//             physics: {
//                 default: "arcade",
//                 arcade: {
//                     gravity: { x: 0, y: 0 },
//                     debug: false,
//                 },
//             },
