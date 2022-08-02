import React, {useEffect, useState} from "react";
import StartFirebase from "../config/firebase-config";
import {ref, remove} from "firebase/database";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Note from "./notes/Note";
import './styles.css'
// import memos from "../memos";
// local file
import CreateNote from "./notes/CreateNote";
import {Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./layout/LoginForm";
import RegistrationForm from "./layout/RegistrationForm";
import LogoutForm from "./layout/LogoutForm";

function App() {

    const [notes, setNotes] = useState([]);
    const db = StartFirebase();

    //https://react-app-3f88c-default-rtdb.europe-west1.firebasedatabase.app/notes.json
    async function addNote(note) {
        const response = await fetch('https://react-app-3f88c-default-rtdb.europe-west1.firebasedatabase.app/notes.json', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        note.id = data.name;
        setNotes(prevState => {
            return [...prevState, note];
        });

    }

    useEffect(() => {
        async function getNotes() {
            const response = await fetch('https://react-app-3f88c-default-rtdb.europe-west1.firebasedatabase.app/notes.json');

            const responseData = await response.json();

            const loadedNotes = [];

            for (const key in responseData) {
                loadedNotes.push({
                    id: key,
                    title: responseData[key].title,
                    content: responseData[key].content,
                    color: responseData[key].color
                })
            }
            setNotes(loadedNotes);
        }

        getNotes().catch((err) => {
            console.log(err);
        })
    }, [])

    function deleteNote(id) {
        console.log("id of the entity to be deleted: " + id);
        const noteRef = ref(db, '/notes/' + id);
        console.log("ref: " + noteRef);
        remove(noteRef).catch((err) => {
            console.log(err)
        });
        setNotes(prevState => {
            return prevState.filter((noteItem) => {
                return noteItem.id !== id;
            })
        })
    }

    const noteList = notes.map((noteItem) => {
        return <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            color={noteItem.color}/>
    })

    return (
        <div>
            <Header/>
            <Routes>
                <Route path={'/notes'} element={noteList}/>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/register'} element={<RegistrationForm/>}/>
                <Route path={'/logout'} element={<LogoutForm/>}/>
                <Route path={'/new-note'} element={<CreateNote onAdd={addNote}/>}/>
                <Route path={'/*'} element={<Navigate to={'/notes'}/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;