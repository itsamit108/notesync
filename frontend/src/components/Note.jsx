import React, { useContext, useState, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteLayout from './NoteLayout.css';

export default function Note({ note, updateNote, showAlert }) {
    const { deleteNote } = useContext(NoteContext);
    const [color, setColor] = useState(null);
    const [textColor, setTextColor] = useState('#808080'); // set initial text color to black

    useEffect(() => {
        const colors = [
            'rgb(255, 228, 225)',
            'rgb(255, 218, 185)',
            'rgb(221, 160, 221)',
            'rgb(176, 224, 230)',
            'rgb(240, 230, 140)',
            'rgb(255, 192, 203)',
            'rgb(176, 196, 222)',
            'rgb(152, 251, 152)',
            'rgb(255, 250, 205)',
            'rgb(135, 206, 250)',
            'rgb(221, 221, 160)',
            'rgb(203, 255, 192)',
            'rgb(222, 176, 196)',
            'rgb(255, 204, 204)',
            'rgb(204, 204, 255)',
            'rgb(204, 255, 204)',
            'rgb(255, 204, 255)',
            'rgb(204, 255, 255)',
            'rgb(255, 230, 230)',
            'rgb(230, 255, 230)',
            'rgb(230, 230, 255)',
            'rgb(255, 240, 245)',
            'rgb(245, 255, 240)',
            'rgb(240, 245, 255)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);

        // calculate brightness of the color
        const [r, g, b] = randomColor.slice(4, -1).split(',').map(Number);
        const brightness = Math.sqrt(0.299 * (r ** 2) + 0.587 * (g ** 2) + 0.114 * (b ** 2));
        // set text color based on brightness
        if (brightness > 127.5) {
            setTextColor('#454545'); // set text to black for lighter backgrounds
        } else {
            setTextColor('#fff'); // set text to white for darker backgrounds
        }
    }, []);

    const deleteNoteHandler = () => {
        deleteNote(note._id);
        showAlert('Note deleted successfully', 'success');
    };

    const date = new Date(note.date);
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    note.date = date.toLocaleDateString('en-US', options);

    return (
        <div className="col-md-4 mb-4" >
            <div className="card shadow h-100" style={{ backgroundColor: color, color: textColor }}>
                <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-left">
                        <p className="card-text mb-1 mt-2"><small>{note.date}</small></p>
                    </div>
                    <div className='mt-2'>
                        <h5 className="card-title mb-2">{note.title}</h5>
                        <hr className="mt-2 mb-3" />
                        <p className="card-text">{note.description}</p>
                    </div>
                    <div>
                        <p className="card-text mb-1 mt-2"><small><strong>Tag:</strong> {note.tag}</small></p>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-danger me-2" onClick={deleteNoteHandler}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-primary" onClick={() =>
                                updateNote(note)}>
                                <i className="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
