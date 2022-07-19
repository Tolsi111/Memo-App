import React from "react";
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function Buttons(props) {

    return (
        <div className={"create-note"}>
            <Zoom in={props.isExpanded}
                  style={{background: '#FFB562'}}>
                <Fab onClick={props.submitNote}>
                </Fab>
            </Zoom>
            <Zoom in={props.isExpanded}
                  style={{transitionDelay: '250ms'}}>
                <Fab onClick={props.submitNote}
                     style={{ background: '#3AB0FF'}}>
                </Fab>
            </Zoom>
            <Zoom in={props.isExpanded}
                  style={{transitionDelay: '500ms', background: '#F87474'}}>
                <Fab onClick={props.submitNote}>
                </Fab>
            </Zoom>
        </div>
    );
}

export default Buttons;