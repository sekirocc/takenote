import { useRef, useState, useEffect } from "react";

import { AnchorButton, Button, ButtonGroup, Classes, Icon, IconSize } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

export const NotebookList = (props) => {
    console.log("in NotebookList");
    console.log(props);

    return (
        <>
            <div className="notebooks_list pane-header">
                <ButtonGroup>
                    <Button text={"Notebooks"} />
                    <Button text={"Tags"} />
                </ButtonGroup>
            </div>
            <div style={{ "overflow": "scroll" }}>
                <div className="section-library"></div>
                <div className="section-notebooks">
                    <ul className={Classes.LIST_UNSTYLED + " " + Classes.LIST}
                    >

                        {props.notebooks.map((notebook) => {
                            return <li key={notebook.name} onClick={() => { props.selectNotebookHandler(notebook.name); }}>{notebook.name}</li>
                        })}

                    </ul></div>
            </div>
            <div className="pane-footer">
                <Button minimal={true} icon={<Icon size={IconSize.LARGE} icon={"plus"}></Icon>} />
            </div>
        </>
    )
}