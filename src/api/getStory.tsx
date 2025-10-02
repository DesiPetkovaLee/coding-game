import React, { useState, useEffect } from "react";
import { csv } from "d3";
import {StoryPage} from "./../pages/story/StoryPage";

export interface StoryRow {
    id: string;
    line: string;
    text: string;
}

export const StoryReader = () => {
    const [data, setData] = useState<StoryRow[]>([]);


    console.log("loading data .... from bunkerStory")

    useEffect(() => {
        csv("/assets/bunkerStory.csv")
            .then((rows: Record<string, string>[]) => {
                console.log("raw csv:", rows)
                const parsed: StoryRow[] = rows.map((d) => ({
                    id: d.id ?? "",
                    line: d.line ?? "",
                    text: d.text ?? "",
                }));
                console.log("parsed csv:", parsed);
                setData(parsed);
            })
            .catch((err) => console.error(err));
    }, []);
    console.log(data);

    return (
        <div>
            <h1>Story</h1>
            {data.length > 0 ? (
                <StoryPage height="300px" speed={30}>
                    {data.map((row) => (
                        <p key={row.id}>{row.text}</p>
                    ))} 
                </StoryPage>
            ) : (
                <p>Loading story...</p>
            )}
        </div>
    );
};
