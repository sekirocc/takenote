import { useRef, useState, useEffect } from "react";

import { getNotebooksData } from '../lib/notes';
import { Grommet, Header, Text, Box, Grid, Button, DataTable } from 'grommet';

export const NoteList = (props) => {

    const columns = [
        { property: "name", size: "50px", primary: true, header: <Text>Notes</Text>, }
    ]
    var rowProps = {};
    rowProps[props.current.name] = { background: "dark-5" };

    return (
        <Box
            overflow="scroll"
            gridArea="note_list"
            background="dark-3"
            width="small"
            animation={[
                { type: 'fadeIn', duration: 300 },
                // { type: 'slideRight', size: 'xlarge', duration: 150 },
            ]} >
            <DataTable
                pin={true}
                columns={columns}
                primaryKey="name"
                // size="xlarge"
                rowProps={rowProps}
                data={props.notes}
                onClickRow={({ datum, }) => props.selectNoteHandler(datum.name)}
            />
        </Box>

        // <Box
        //     overflow="scroll"
        //     gridArea="note_list"
        //     background="dark-4"
        //     width="small"
        //     animation={[
        //         { type: 'fadeIn', duration: 300 },
        //         { type: 'slideRight', size: 'xlarge', duration: 150 },
        //     ]}
        // >
        //     {props.notes.map(({name,}) => (
        //         <Button key={name} href="#" hoverIndicator onClick={() => props.selectNoteHandler(name)}>
        //             <Box
        //                 pad={{ horizontal: 'medium', vertical: 'small' }}
        //                 background={props.current.name == name ? "dark-4": "dark-3"}>
        //                 <Text>{name}</Text>
        //             </Box>
        //         </Button>
        //     ))}
        // </Box>
    )
}