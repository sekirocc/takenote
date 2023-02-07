import { useRef, useState, useEffect } from "react";

import { Button, ButtonGroup, Classes, Icon, IconSize, Text } from "@blueprintjs/core";

export const NoteList = (props) => {

    return (
        <>
            <div className="notes_list pane-header">
                <ButtonGroup style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <Text>{props.notebook.name}</Text>
                    <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"plus"}></Icon>} />
                </ButtonGroup>
            </div>
            <ul className={Classes.LIST_UNSTYLED + " " + Classes.LIST}
                style={{ "overflow": "scroll" }}>
                {props.notes.map((note) => {
                    return <li key={note.name} onClick={() => { props.selectNoteHandler(note.name); }}>{note.name}</li>
                })}

            </ul>

            <div className="pane-footer" >
                    <div className="searcher bp4-input-group bp4-small" >
                        <span className={"bp4-icon bp4-icon-search "}></span>
                        <input className={"bp4-input "} type="search" placeholder="Filter by keyword" dir="auto" />
                    </div>
            </div>
        </>

    )
}