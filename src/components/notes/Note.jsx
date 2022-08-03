import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@material-ui/core/Fab';
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

function Note(props) {
    const authCtx = useContext(AuthContext);

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
            {authCtx.isLoggedIn && props.ownerEmail === authCtx.email && <Fab onClick={handleDelete}>
                <DeleteIcon style={{color: props.color}}/>
            </Fab>}
            {authCtx.isLoggedIn && props.ownerEmail === authCtx.email && <Fab onClick={handleEdit}>
                <EditIcon style={{color: props.color}}/>
            </Fab>}
        </div>
    );
}

export default Note;