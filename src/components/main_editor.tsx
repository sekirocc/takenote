import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { getNoteDetail } from '../lib/notes';

import { NoteDetail } from "../lib/types";
import React from "react";
import { Button, ButtonGroup, Icon, IconSize, Text } from "@blueprintjs/core";

export const MainEditor = (props) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="editor pane-header">
                <ButtonGroup style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <Button icon={<Icon size={IconSize.LARGE} icon={"edit"}></Icon>} />
                    <Button icon={<Icon size={IconSize.LARGE} icon={"eye-open"}></Icon>} />
                    <Button icon={<Icon size={IconSize.LARGE} icon={"panel-stats"}></Icon>} />
                </ButtonGroup>
            </div>
            <Editor
                tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={props.current.noteDetail != null && props.current.noteDetail.content}
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
            <div className="pane-footer">
                <ButtonGroup style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"chevron-left"}></Icon>} />
                    <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"chevron-right"}></Icon>} />
                </ButtonGroup>
                <ButtonGroup style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"star-empty"}></Icon>} />
                    <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"presentation"}></Icon>} />
                    <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"more"}></Icon>} />
                </ButtonGroup>
            </div>
        </>
    )

}