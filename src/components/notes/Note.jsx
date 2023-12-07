import React, {useState, useContext, useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Fab from '@material-ui/core/Fab';
import AuthContext from "../../store/auth-context";
import Buttons from "./Buttons";

function Note(props) {
    const authCtx = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [editTitleFocus, setEditTitleFocus] = useState(false);
    const [editContentFocus, setEditContentFocus] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        setEditMode(editTitleFocus || editContentFocus)
    }, [editTitleFocus,editContentFocus])


    function handleDelete() {
        props.onDelete(props.id);
    }

    function handleEdit() {
        setEditMode(true);
    }

    function handleDone() {
        // delete this note, save another
        let note = {
            title: editTitle,
            content: editContent,
            color: props.color,
            ownerEmail: props.ownerEmail
        };
        props.onEdit(props.id,note)
        setEditMode(false);
    }

    return (
        <div className={"note"}>
            {!editMode && <>
                <h1>{props.title}</h1>
                <p>{props.content}</p>
            </>}
            {editMode && <div className={"edit-note"}>
                <input name={"title"}
                       defaultValue={props.title}
                       onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea name={"content"}
                          defaultValue={props.content}
                          onChange={(e) => setEditContent(e.target.value)}
                />
            </div>}
            {authCtx.isLoggedIn && props.ownerEmail === authCtx.email && <Fab onClick={handleDelete}>
                <DeleteIcon style={{color: props.color}}/>
            </Fab>}
            {!editMode && authCtx.isLoggedIn && props.ownerEmail === authCtx.email && <Fab onClick={handleEdit}>
                <EditIcon style={{color: props.color}}/>
            </Fab>}
            {editMode && authCtx.isLoggedIn && props.ownerEmail === authCtx.email && <Fab onClick={handleDone}>
                <DoneIcon style={{color: props.color}}/>
            </Fab>}
        </div>
    );
}

export default Note;