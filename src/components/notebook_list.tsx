import { useRef, useState, useEffect } from "react";

import { AnchorButton, Button, ButtonGroup, Classes, Icon, IconSize, Text } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

export const NotebookList = (props) => {
    console.log("in NotebookList");
    console.log(props);

    return (
        <>
            <div className="pane-header">
                <ButtonGroup>
                    <Button text={"Notebooks"} />
                    <Button text={"Tags"} />
                </ButtonGroup>
            </div>
            <div className="notebooks_list">
                <div className="section-library"></div>
                <div className="section-notebooks">
                    <ul className={Classes.LIST_UNSTYLED + " " + Classes.LIST}
                    >

                        {props.notebooks.map((notebook) => {
                            return <li key={notebook.name}
                                className={notebook.name == props.current.name ? "selected" : ""}
                                onClick={() => { props.selectNotebookHandler(notebook.name); }}>
                                    <Text>{notebook.name}</Text>
                                    <Text>{notebook.notes.length}</Text>
                            </li>
                        })}

                    </ul></div>
            </div>
            <div className="pane-footer">
                <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"plus"}></Icon>} />
            </div>
        </>
    )
}