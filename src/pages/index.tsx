import { useRef, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import { Grommet, Header, Text, Box, Grid, Button } from 'grommet';

import { getNotebooksData } from '../lib/notes';

import { NotebookList } from '../components/notebook_list';
import { NoteList } from '../components/note_list';
import { MainEditor } from "../components/main_editor";
import { Note, Notebook } from "../lib/type";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name: "iam", }));
    }

    // const dirInDownload = "~/Downloads/quiver_out";
    const dirInDownload = "quiver_out";

    const [notebookLoaded, setNotebookLoaded] = useState(false);

    const [notebookList, setNotebookList] = useState<Notebook[]>([]);
    const [noteList, setNoteList] = useState<Note[]>([]);

    const [currentNotebook, setCurrentNotebook] = useState<Notebook>(new Notebook());
    const [currentNote, setCurrentNote] = useState<Note>(new Note());

    const [showNotebookList, setShowNotebookList] = useState(true);
    const [showNoteList, setShowNoteList] = useState(true);

    const grommetOpts = {
        global: {
            font: {
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
        // console.log("isClient, window.innerHeight", window.innerHeight);

        if (notebookLoaded) {
            console.log("already loaded notebookList: ");
            console.log(notebookList);
            setNotebookList(notebookList);
            return;
        }

        const fetchData = async () => {
            console.log("before getNotebooksData");
            const notebooks = await getNotebooksData(dirInDownload);
            // setRawData(notebooks);
            console.log("notebooks");
            setNotebookList(notebooks);
            setNotebookLoaded(true);
        }

        fetchData();
    })

    function selectNotebook(name: string) {
        console.log(name)
        notebookList.find((notebook, i) => {
            if (notebook.name == name) {
                console.log("find selected notebook: ")
                console.log(notebook);
                setCurrentNotebook(notebook);
                setNoteList(notebook.notes);
                return true;
            }
        })
    }

    function selectNote(name: string) {
        noteList.find((note, i) => {
            if (note.name == name) {
                setCurrentNote(note);
                return true;
            }
        })
    }

    return (
        <Grommet theme={grommetOpts} full>
            <Grid
                fill
                height={{ height: "500px" }}
                rows={['auto', 'flex']}
                columns={['auto', 'auto', 'flex']}
                areas={[
                    { name: 'header', start: [0, 0], end: [2, 0] },
                    { name: 'notebook_list', start: [0, 1], end: [0, 1] },
                    { name: 'note_list', start: [1, 1], end: [1, 1] },
                    { name: 'main', start: [2, 1], end: [2, 1] },
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
                    <Button onClick={() => setShowNotebookList(!showNotebookList)}>
                        <Text size="large">Show Notebook List</Text>
                    </Button>
                    <Button onClick={() => setShowNoteList(!showNoteList)}>
                        <Text size="large">Show Note List</Text>
                    </Button>
                    <Text>options</Text>
                </Box>

                {showNotebookList &&
                    <NotebookList
                        notebooks={notebookList}
                        current={currentNotebook}
                        selectNotebookHandler={selectNotebook}
                    />}

                {showNoteList &&
                    <NoteList
                        notes={noteList}
                        current={currentNote}
                        selectNoteHandler={selectNote}
                    />}

                <MainEditor
                    current={currentNote}
                />

            </Grid>

        </Grommet>
    );
}

export default App;