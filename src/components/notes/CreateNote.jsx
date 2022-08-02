import React, {useState} from "react";
import Buttons from "./Buttons";
import ErrorModal from "../layout/ErrorModal";
import {useNavigate} from 'react-router-dom';

function CreateNote(props) {

    const navigate = useNavigate();
    const [isExpanded, setExpanded] = useState(false);
    const [error, setError] = useState({
        isError: false, title: "", message: ""
    });

    const [note, setNote] = useState({
        title: "", content: "", color: ""
    });

    function expand() {
        setExpanded(true);
    }

    function handleChange(event) {
        const {name, value} = event.target;

        setNote(prevState => {
            return {
                ...prevState, [name]: value
            }
        })
    }

    function closeError() {
        setError({
            isError: false, title: "", message: ""
        });
    }

    function submitNote(event) {
        if (note.title.trim().length === 0) {
            setError({
                isError: true, title: "Need a title!", message: "Please add a title to the note."
            });
            return
        }
        if (note.content.trim().length === 0) {
            setError({
                isError: true, title: "Missing content!", message: "Please do not leave an empty note."
            });
            return
        }
        note.color = event.target.style.background;
        props.onAdd(note);
        setNote({
            title: "", content: "", color: ""
        })
        navigate('/notes');
        event.preventDefault();
    }

    return (<div>
        {error.isError && <ErrorModal title={error.title} message={error.message} closeError={closeError}/>}
        <form className={"create-note"}>
            {isExpanded ? <input name={"title"}
                                 onChange={handleChange}
                                 value={note.title}
                                 placeholder={"Title"}
            /> : null}
            <textarea name={"content"}
                      onClick={expand}
                      onChange={handleChange}
                      value={note.content}
                      placeholder={"Take a note..."}
                      rows={isExpanded ? 3 : 1}/>
            <Buttons isExpanded={isExpanded} submitNote={submitNote}/>
        </form>
    </div>);
}

export default CreateNote;