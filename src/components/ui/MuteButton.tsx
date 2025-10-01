import GameButton from './GameButton';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useState } from 'react';
import { useEventBus } from '../../hooks/useEventBus';
import { MUSIC_EVENTS } from '../../constants/events';

const MuteButton = () => {
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const { emit } = useEventBus();

    const handleMuteClick = () => {
        emit(MUSIC_EVENTS.TOGGLE_MUTE);
        setIsMuted(!isMuted);
    };

    return (
        <GameButton
            onClick={handleMuteClick}
            variant={'contained'}
            color={'primary'}
            size={'small'}>
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </GameButton>
    );
};

export default MuteButton;
