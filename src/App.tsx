import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import StartPage from './pages/start/StartPage';
import SetupPage from './pages/setup/SetupPage';
import StoryPage from './pages/story/StoryPage';
import { CodingQuestion } from './pages/codingQuestion/CodingQuestion';
import LevelSelectPage from './pages/levelSelect/LevelSelectPage';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './appState/auth/AuthContext';
import GameInitialiser from './phaser/GameInitialiser';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/setup" element={<SetupPage />} />
                    <Route path="/story" element={<StoryPage />} />
                    <Route
                        path="/codingQuestion"
                        element={<CodingQuestion />}
                    />
                    <Route path="/level-select" element={<LevelSelectPage />} />
                    <Route path="/game" element={<GameInitialiser />} />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
