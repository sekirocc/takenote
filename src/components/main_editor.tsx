import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { getNoteDetail } from '../lib/notes';

import { Close } from 'grommet-icons';

import { Menu, Down } from 'grommet-icons';

import { Box, Menu as GMenu, Button, DropButton, Grid, Heading, Text } from 'grommet';

import { NoteDetail } from "../lib/type";
import React from "react";

export const MainEditor = (props) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    const [open, setOpen] = useState(false);

    const [noteDetail, setNoteDetail] = useState<NoteDetail>(null);

    useEffect(() => {
        const isClient = typeof window !== 'undefined';
        if (!isClient) { return; }

        const fetchData = async () => {
            const noteDetail = await getNoteDetail(props.current);
            setNoteDetail(noteDetail);
        }

        fetchData();
    })

    return (
        <div style={{"width": "100%"}}>
            <div>toolbar</div>
            <Editor
                tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={noteDetail && noteDetail.content}
                init={{
                    width: "100%",
                    height: "100%",
                    // height: 500,
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
        </div>
    )

}