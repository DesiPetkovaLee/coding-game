import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

interface TimerProps {
    timerInitialValue: number;
    timeElapsedBackgroundColor: string;
    timeRemainingBackgroundColor: string;
}

const Timer = (props: TimerProps) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(
        props.timerInitialValue - timeElapsed,
    );

    useEffect(() => {
        console.log(
            'Time Elapsed: ',
            timeElapsed,
            'Time Remaining: ',
            timeRemaining,
        );
    }, [timeElapsed]);

    return (
        <div>
            <PieChart
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
