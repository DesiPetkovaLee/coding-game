import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { GameScene } from "./phaser/scenes/GameScene";

export default function App() {
  const host = useRef<HTMLDivElement>(null);
  //MATT NOTE ---> This is the config which we're also storing in config, so don't need to redeclare here,
  //but also need to reference somehow
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: host.current!,
      backgroundColor: 0x0b1020,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [GameScene],
    });

    return () => game.destroy(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-dvh bg-slate-900 text-white flex items-start justify-center pt-6">
        <div ref={host} id="game-root" />
        <div className="ml-4 mt-2 text-emerald-400">Tailwind is working</div>
      </div>
    </ThemeProvider>
  );
}

// test page - to be deleted when we start building the game
