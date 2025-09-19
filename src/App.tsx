import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import LogIn from "./pages/auth/LoginPage";
import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { GameScene } from "./phaser/scenes/GameScene";
import { config } from "./phaser/core/config";

export default function App() {
    const host = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const game = new Phaser.Game(config);
        return () => game.destroy(true);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="min-h-dvh bg-slate-900 text-white flex items-start justify-center pt-6">
                {/* <LogIn></LogIn> */}
                <div ref={host} id="game-root" />
                <div className="ml-4 mt-2 text-emerald-400">
                    Tailwind is working
                </div>
            </div>
        </ThemeProvider>
    );
}

// test page - to be deleted when we start building the game
