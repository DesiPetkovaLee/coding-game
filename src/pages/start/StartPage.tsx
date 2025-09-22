import { Link } from "react-router-dom";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import "./Start.css";

export default function StartPage() {
    const theme = useTheme();
    
   // maybe make the shadow less intense later on (accessibility...)
    const textShadow = `4px 4px 0px ${theme.palette.primary.main}, 8px 8px 0px #4D3132`; 

    return (
        <Box className="start-page-container">
            <Box
                component="img"
                src="/assets/character-sprites/thinker-walking.png"
                alt="" 
                aria-hidden="true" 
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: { xs: '75px', md: '100px' },
                    height: 'auto',
                }}
            />
            <Box
                component="img"
                src="/assets/enemy-sprites/bitey.png"
                alt="" 
                aria-hidden="true" 
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: { xs: '75px', md: '100px' },
                    height: 'auto',
                }}
            />

            <Box sx={{ zIndex: 1, textAlign: 'center' }}>
                <Box 
                    role="heading" 
                    aria-level={1} 
                    sx={{ 
                        mb: 4, 
                        filter: 'drop-shadow(0 0 35px rgba(222, 222, 209, 0.3))' 
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{ 
                            color: 'text.primary', 
                            textShadow: textShadow,
                            position: 'relative',
                            right: '1ch'
                        }}
                    >
                        CODE FOR
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{ 
                            color: 'text.primary', 
                            textShadow: textShadow,
                            position: 'relative',
                            left: '1ch'
                        }}
                    >
                        YOUR LIFE
                    </Typography>
                </Box>
                <Stack spacing={2} alignItems="center">
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        color="secondary"
                        sx={{
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            width: '250px',
                            borderRadius: '50px',
                        }}
                    >
                        LOG IN
                    </Button>
                    <Button
                        component={Link}
                        to="/signup"
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            width: '250px',
                            borderRadius: '50px',
                        }}
                    >
                        SIGN UP
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
