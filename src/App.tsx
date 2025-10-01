import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import StartPage from './pages/start/StartPage';
import SetupPage from './pages/setup/SetupPage';
import StoryPage from './pages/story/StoryPage';
import LevelSelectPage from './pages/levelSelect/LevelSelectPage';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './appState/auth/AuthContext';
import GameInitialiser from './phaser/GameInitialiser';
import GameButton from './components/ui/GameButton';
import { useEventBus } from './hooks/useEventBus';
import { MUSIC_EVENTS } from './constants/events';

export default function App() {
    const { emit } = useEventBus();

    const handleMuteClick = () => {
        emit(MUSIC_EVENTS.TOGGLE_MUTE);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GameButton
                onClick={handleMuteClick}
                variant={'contained'}
                color={'primary'}
                size={'small'}>
                Mute
            </GameButton>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/setup" element={<SetupPage />} />
                    <Route path="/story" element={<StoryPage />} />
                    <Route path="/level-select" element={<LevelSelectPage />} />
                    <Route path="/game" element={<GameInitialiser />} />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}
