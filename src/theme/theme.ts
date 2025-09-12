import { createTheme } from "@mui/material/styles";

const COLOURS = {
  cyan:   "#C8F7FA",
  blue:   "#2A87CB",
  bone:   "#DEDED1",
  ink0:   "#0B0D0A",
  rust:   "#954734",
  plum:   "#4D3132",
  grayD:  "#4A4A4A",
  grayM:  "#B8B8B8",
  black1: "#181818",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: COLOURS.blue },
    secondary: { main: COLOURS.rust },
    background: { default: COLOURS.ink0, paper: COLOURS.black1 },
    text: { primary: COLOURS.bone, secondary: COLOURS.grayM },
    success: { main: COLOURS.cyan },
  },
  typography: {
    fontFamily: ['"Roboto"', "system-ui", "Arial", "sans-serif"].join(","),
    h1: { fontFamily: '"Press Start 2P", system-ui', letterSpacing: 1 },
    h2: { fontFamily: '"Press Start 2P", system-ui', letterSpacing: 1 },
    h3: { fontFamily: '"Press Start 2P", system-ui', letterSpacing: 0.5 },
    button: { fontFamily: '"Press Start 2P", system-ui', textTransform: "none" },
  },
  shape: { borderRadius: 10 },
});

export default theme;
export { COLOURS };
