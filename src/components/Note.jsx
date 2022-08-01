import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@material-ui/core/Fab';

function Note(props) {

    function handleDelete() {
        props.onDelete(props.id);
    }

    function handleEdit() {
        props.onEdit(props.id);
    }

    return (
        <div className={"note"}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <Fab onClick={handleDelete}>
                <DeleteIcon style={{color: props.color}}/>
            </Fab>
            <Fab onClick={handleEdit}>
                <EditIcon style={{color: props.color}}/>
            </Fab>
        </div>
    );
}

export default Note;