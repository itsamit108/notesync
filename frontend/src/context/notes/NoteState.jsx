import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetch_all_notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    };

    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/add_note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        setNotes(notes.concat(json));
    };

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/delete_note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/update_note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        let name = json.name;
        let email = json.email;
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, name: localStorage.getItem('name'), email: localStorage.getItem('email'), getUser }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
