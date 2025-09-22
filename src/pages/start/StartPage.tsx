import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function StartPage() {
  return (
    <main id="main">
      <Box sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>CODE FOR YOUR LIFE</Typography>
        <Typography sx={{ mb: 4 }}>Year 2030 — Bakerloo Bunker</Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button component={RouterLink} to="/game" variant="contained">Play</Button>
          <Button component={RouterLink} to="/login" variant="outlined">Log In</Button>
        </Stack>
      </Box>
    </main>
  );
}
