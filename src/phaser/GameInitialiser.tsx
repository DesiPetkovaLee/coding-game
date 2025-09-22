import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { config } from "./core/config";

export default function GameInitialiser() {
  const gameContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameContainer.current) {
      const game = new Phaser.Game({
        ...config,
        parent: gameContainer.current,
      });
      return () => game.destroy(true);
    }
  }, []);

  return <div ref={gameContainer} />;
}
