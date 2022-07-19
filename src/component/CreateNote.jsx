import React, {useState} from "react";
import Buttons from "./Buttons";

function CreateNote(props) {

    const [isExpanded, setExpanded] = useState(false);

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

    function submitNote(event) {
        note.color = event.target.style.background;
        props.onAdd(note);
        setNote({
            title: "", content: "", color: ""
        })
        event.preventDefault();
    }

    return (<div>
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