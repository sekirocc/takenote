import { useRef, useState, useEffect } from "react";

import { getNotebooksData } from '../lib/notes';
import { Grommet, Header, Text, Box, Grid, Button } from 'grommet';

export const NotebookList = (props) => {
    return <Box
        overflow="scroll"
        gridArea="notebook_list"
        background="dark-3"
        width="small"
        animation={[
            { type: 'fadeIn', duration: 300 },
            // { type: 'slideRight', size: 'xlarge', duration: 150 },
        ]}
    >
        {props.notebooks.map(({name,}) => (
            <Button key={name} href="#" hoverIndicator onClick={() => props.selectNotebookHandler(name)}>
                <Box
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                    background={props.current.name == name ? "dark-4": "dark-3"}
                    >
                    <Text>{name}</Text>
                </Box>
            </Button>
        ))}
    </Box>
}