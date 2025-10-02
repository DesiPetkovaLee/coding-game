import React from "react";

interface StoryPageProps {
    height: string;
    speed: number;
    children: React.ReactNode;
}

export const StoryPage=({ height, speed, children }: StoryPageProps) => {
    return (
        <div style={{ height, overflowY: "auto", border: "1px solid #ccc" }}>
            <h1>Story Page (speed {speed})</h1>
            <div>{children}</div>
        </div>
    );
}
