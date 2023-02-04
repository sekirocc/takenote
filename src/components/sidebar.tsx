import { useRef, useState, useEffect } from "react";

import { getAllNotesData } from '../lib/notes';
import { Grommet, Header, Text, Box, Grid, Button } from 'grommet';

export const Sidebar = () => {
    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        const isClient = typeof window !== 'undefined';
        if (!isClient) {
            return;
        }

        if (noteList.length > 0) {
            return;
        }

        const fetchData = async () => {
            console.log("before allNotesData");
            const allNotesData = await getAllNotesData();

            const names = allNotesData.map((fileEntry, index, subDirs) => {
                return fileEntry.name;
            });

            console.log("names");
            setNoteList(names);
        }

        fetchData();
    })

    return <Box
        overflow="scroll"
        gridArea="sidebar"
        background="dark-3"
        width="small"
        animation={[
            { type: 'fadeIn', duration: 300 },
            { type: 'slideRight', size: 'xlarge', duration: 150 },
        ]}
    >
        {noteList.map((name) => (
            <Button key={name} href="#" hoverIndicator>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                    <Text>{name}</Text>
                </Box>
            </Button>
        ))}
    </Box>
}