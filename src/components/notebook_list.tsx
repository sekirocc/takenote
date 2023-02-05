import { useRef, useState, useEffect } from "react";

import { getNotebooksData } from '../lib/notes';
import { Grommet, Header, Text, Box, Grid, Button, DataTable, List } from 'grommet';
import { Data } from "grommet/components/Data";

export const NotebookList = (props) => {
    console.log("in NotebookList");

    const columns = [
        { property: "name", size: "50px", }
    ]
    var rowProps = {};
    rowProps[props.current.name] = { background: "dark-5" };

    return (
        <Box
            overflow="scroll"
            gridArea="notebook_list"
            background="dark-3"
            width="small"
            animation={[
                { type: 'fadeIn', duration: 300 },
                // { type: 'slideRight', size: 'xlarge', duration: 150 },
            ]} >
            <DataTable
                columns={columns}
                primaryKey="name"
                rowProps={rowProps}
                data={props.notebooks}
                onClickRow={({ datum, }) => props.selectNotebookHandler(datum.name)}
            />
        </Box>
        // <Box
        //     overflow="scroll"
        //     gridArea="notebook_list"
        //     background="dark-3"
        //     width="small"
        //     animation={[
        //         { type: 'fadeIn', duration: 300 },
        //         // { type: 'slideRight', size: 'xlarge', duration: 150 },
        //     ]}
        // >
        //     {props.notebooks.map(({name,}) => (
        //         <Button key={name} href="#" hoverIndicator onClick={() => props.selectNotebookHandler(name)}>
        //             <Box
        //                 pad={{ horizontal: 'medium', vertical: 'small' }}
        //                 background={props.current.name == name ? "dark-4": "dark-3"}
        //                 >
        //                 <Text>{name}</Text>
        //             </Box>
        //         </Button>
        //     ))}
        // </Box>
    )
}