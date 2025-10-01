import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

// IDEAS: timer displaying smiley face to sad face as timer goes down.

interface TimerProps {
    timerInitialValue: number;
    colors?: string[];
    onTimerComplete?: () => void;
    size?: { width: number; height: number };
    // event emitter to unpause current scene
}

const Timer = (props: TimerProps) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(props.timerInitialValue);

    const timerColors = props.colors ? props.colors : ['red', 'blue'];

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
            setTimeRemaining((prev) => {
                const newValue = prev - 1;
                if (newValue <= 0) {
                    clearInterval(interval);
                    if (props.onTimerComplete) {
                        props.onTimerComplete();
                    }
                }
                return newValue;
            });
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('Time Remaining: ', timeRemaining);
        console.log('Time Elapsed: ', timeElapsed);
    }, [timeRemaining, timeElapsed]);

    return (
        <div>
            <PieChart
                colors={timerColors}
                series={[
                    {
                        data: [
                            { id: 0, value: timeElapsed },
                            { id: 1, value: timeRemaining },
                        ],
                    },
                ]}
                width={props.size?.width || 200}
                height={props.size?.height || 200}
            />
        </div>
    );
};

export default Timer;
