import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
// import memos from "../memos";
// local file
import CreateNote from "./CreateNote";

function App() {

    const [notes, setNotes] = useState([]);

    function addNote(note) {
        setNotes(prevState => {
            return [...prevState, note];
        });

    }

    function deleteNote(id) {
        setNotes(prevState => {
            return prevState.filter((noteItem, index) => {
                return index !== id;
            })
        })
    }

    return (
        <div>
            <Header/>
            {/*{memos.map((note) => {*/}
            {/*    return <Note*/}
            {/*        key={note.id}*/}
            {/*        title={note.title}*/}
            {/*        content={note.content}*/}
            {/*    />*/}
            {/*})}*/}
            <CreateNote onAdd={addNote}/>
            {notes.map((noteItem, index) => {
                return <Note
                    key={index}
                    id={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                    color={noteItem.color}/>
            })}
            <Footer/>
        </div>
    );
}

export default App;