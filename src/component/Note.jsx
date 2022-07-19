import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@material-ui/core/Fab';

function Note(props) {

    function handleClick() {
        props.onDelete(props.id);
        console.log("color: ");
        console.log(props.color);
    }

    return (
        <div className={"note"}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <Fab onClick={handleClick}>
                <DeleteIcon style={{color: props.color}}/>
            </Fab>
        </div>
    );
}

export default Note;