import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function Buttons(props) {

    return (
        <div>
            <Zoom in={props.isExpanded}
                  style={{background: '#FFB562'}}>
                <Fab onClick={props.submitNote}>
                    <AddIcon/>
                </Fab>
            </Zoom>
            <Zoom in={props.isExpanded}
                  style={{transitionDelay: '250ms', background: '#3AB0FF'}}>
                <Fab onClick={props.submitNote}>
                    <AddIcon/>
                </Fab>
            </Zoom>
            <Zoom in={props.isExpanded}
                  style={{transitionDelay: '500ms', background: '#F87474'}}>
                <Fab onClick={props.submitNote}>
                    <AddIcon/>
                </Fab>
            </Zoom>
        </div>
    );
}

export default Buttons;