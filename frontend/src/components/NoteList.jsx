import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Note from './Note';
import { useNavigate } from 'react-router-dom';

export default function NoteList(props) {
    const context = useContext(NoteContext);

    const { notes, getNotes, editNote } = context;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            // eslint-disable-next-line
        } else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);

    const [note, setNote] = useState({ editTitle: '', editDescription: '', editTag: '', id: '' });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            editTitle: currentNote.title,
            editDescription: currentNote.description,
            editTag: currentNote.tag,
            id: currentNote._id
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.editTitle, note.editDescription, note.editTag);
        props.showAlert('Note updated successfully', 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                <input className="form-control" id="editTitle" name='editTitle' placeholder="Enter Title" onChange={onChange} value={note.editTitle} onClick={handleClick} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                                <textarea className="form-control" id="editDescription" name='editDescription' placeholder="Enter Description" onChange={onChange} value={note.editDescription} onClick={handleClick} minLength={5} required />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='tag' className='form-label'>
                                    Tag
                                </label>
                                <select className='form-select' id='editTag' name='editTag' onChange={onChange} value={note.editTag} style={{ color: 'grey', border: '1px solid grey', borderRadius: '10px' }}>
                                    <option value='default'>Select a tag</option>
                                    <option value='personal'>Personal</option>
                                    <option value='work'>Work</option>
                                    <option value='shopping'>Shopping</option>
                                    <option value='others'>Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn text-white" data-bs-dismiss="modal" style={{ borderRadius: '50px', backgroundColor: 'grey' }}>Close</button>
                            <button type="button" className="btn text-white" data-bs-dismiss="modal" onClick={handleClick} disabled={note.editTitle.length < 5 || note.editDescription.length < 5} style={{ borderRadius: '50px', backgroundColor: 'purple' }}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ color: 'grey' }}>
                <div className="row my-3">
                    <h2 className='text-center'>Your Notes</h2>
                    <hr className="mt-2 mb-3" />
                    <div className="container my-3 text-center">
                        {notes.length === 0 && 'No notes to display'}
                    </div>
                </div>
                <>
                    <div className="row">
                        {notes.map((note) => {
                            return <Note note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert} />;
                        })}
                    </div>
                </>
            </div>
        </>
    );
}
