import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { getAllNotesData } from '../lib/notes';

import { Text, Box } from 'grommet';

export const MainEditor = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

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

    return <Box gridArea="main" justify="center" align="center">
        <Text>main</Text>
        <Editor
            tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    </Box>

}