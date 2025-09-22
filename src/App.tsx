import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import { Routes, Route } from "react-router-dom";

import StartPage from "./pages/start/StartPage";
import GameInitialiser from "./phaser/GameInitialiser";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GameInitialiser />} />
      </Routes>
    </ThemeProvider>
  );
}
