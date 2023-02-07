import { useRef, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

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
            if (!currentNotebook.name) {
                selectNotebook(notebookList[1].name)
            }
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

    function changePaneVisible(notebookListPaneVisible: boolean, noteListPaneVisible: boolean) {
        setShowNotebookList(notebookListPaneVisible)
        setShowNoteList(noteListPaneVisible)
    }

    return (
        <div className="container">
            {showNotebookList &&
                <div className="pane1">
                    <NotebookList
                        notebooks={notebookList}
                        current={currentNotebook}
                        selectNotebookHandler={selectNotebook}
                    />
                </div>
            }

            {showNoteList &&
                <div className="pane2">
                    <NoteList
                        notes={noteList}
                        current={currentNote}
                        selectNoteHandler={selectNote}
                    />
                </div>
            }

            <div className="pane3">
                <MainEditor
                    current={currentNote}
                    panesVisibleChange={changePaneVisible}
                />
            </div>

        </div>
    );
}

export default App;