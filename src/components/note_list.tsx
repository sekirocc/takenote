import { useRef, useState, useEffect } from "react";

import { Button, ButtonGroup, Classes, Icon, IconSize, Text } from "@blueprintjs/core";

export const NoteList = (props) => {

    return (
        <>
            <div className=" pane-header">
                <ButtonGroup style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <Text>{props.notebook.name}</Text>
                    <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"plus"}></Icon>} />
                </ButtonGroup>
            </div>
            <div className="notes_list">
                <ul className={Classes.LIST_UNSTYLED + " " + Classes.LIST} >
                    {props.notes.map((note) => {
                        return <li key={note.title}
                            className={note.title == props.current.title ? "selected" : ""}
                            onClick={() => { props.selectNoteHandler(note.title); }}>
                                <Text>{note.title}</Text>
                                <Text>{note.noteDetail.formatCreatedAt() }</Text>
                        </li>
                    })}
                </ul>
            </div>

            <div className="pane-footer" >
                <div className="searcher bp4-input-group bp4-small" >
                    <span className={"bp4-icon bp4-icon-search "}></span>
                    <input className={"bp4-input "} type="search" placeholder="Filter by keyword" dir="auto" />
                </div>
            </div>
        </>

    )
}