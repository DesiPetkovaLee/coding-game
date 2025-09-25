import type { Palette } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

interface TimerProps {
    timerInitialValue: number;
    colors: string[];
    onTimerComplete?: () => void;
}

const Timer = (props: TimerProps) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(props.timerInitialValue);

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
    }, []);

    useEffect(() => {
        console.log('Time Remaining: ', timeRemaining);
        console.log('Time Elapsed: ', timeElapsed);
    }, [timeRemaining, timeElapsed]);

    return (
        <div>
            <PieChart
                colors={props.colors}
                series={[
                    {
                        data: [
                            { id: 0, value: timeElapsed },
                            { id: 1, value: timeRemaining },
                        ],
                    },
                ]}
                width={200}
                height={200}
            />
        </div>
    );
};

export default Timer;
