import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { getNoteDetail } from '../lib/notes';

import { Text, Box } from 'grommet';
import { NoteDetail } from "../lib/type";

var noteDetailCache = {};

export const MainEditor = (props) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    const [noteDetail, setNoteDetail] = useState<NoteDetail>(null);

    useEffect(() => {
        const isClient = typeof window !== 'undefined';
        if (!isClient) { return; }

        if (noteDetailCache[props.current.name]) {
            const noteDetail = noteDetailCache[props.current.name];
            setNoteDetail(noteDetail);
            return
        }

        const fetchData = async () => {
            console.log("before getNoteDetail");
            const noteDetail = await getNoteDetail(props.current);
            noteDetailCache[props.current.name] = noteDetail;
            setNoteDetail(noteDetail);
        }

        fetchData();
    })

    return <Box gridArea="main" justify="center" align="center">
        <Text>main</Text>
        <Editor
            tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={noteDetail && noteDetail.content}
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