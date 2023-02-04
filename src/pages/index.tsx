import { useRef, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import { Grommet, Header, Text, Box, Grid, Button } from 'grommet';

import { getAllNotesData } from '../lib/notes';

import { Sidebar } from '../components/sidebar';
import { MainEditor } from "../components/main_editor";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name: "iam", }));
    }

    const [noteList, setNoteList] = useState([]);
    const [noteDetail, setNoteDetail] = useState("");

    const [showSidebar, setShowSidebar] = useState(true);

    const grommetOpts = {
        global: {
            font: {
                family: "Roboto",
                size: "18px",
                height: "20px",
            }
        }
    }

    useEffect(() => {
        const isClient = typeof window !== 'undefined';
        if (!isClient) {
            return;
        }

        console.log("isClient, window.innerHeight", window.innerHeight);
        invoke('greet', { name: 'World' }).then(console.log).catch(console.error);

        if (noteList.length > 0) {
            console.log("noteList length is: " + noteList.length);
            console.log(noteList);
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

    return (

        <Grommet theme={grommetOpts} full>

            <Grid
                fill
                height={{ height: "500px" }}
                rows={['auto', 'flex']}
                columns={['auto', 'flex']}
                areas={[
                    { name: 'header', start: [0, 0], end: [1, 0] },
                    { name: 'sidebar', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                ]}
            >
                <Box
                    gridArea="header"
                    direction="row"
                    align="center"
                    justify="between"
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                    background="dark-2"
                >
                    <Button onClick={() => setShowSidebar(!showSidebar)}>
                        <Text size="large">Title</Text>
                    </Button>
                    <Text>options</Text>
                </Box>

                {showSidebar && <Sidebar></Sidebar>}

                <MainEditor></MainEditor>

            </Grid>

        </Grommet>
    );
}

export default App;