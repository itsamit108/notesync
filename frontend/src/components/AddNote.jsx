import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

    const handleClick = (e) => {
        e.preventDefault();
        if (note.title.length < 3) {
            props.showAlert('Title must be at least 3 characters long', 'danger');
            return;
        }
        if (note.description.length < 5) {
            props.showAlert('Description must be at least 5 characters long', 'danger');
            return;
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: 'default' });
        props.showAlert('Note added successfully', 'success');
    };

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='container my-5' style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px', padding: '20px' }}>
            <h2 className='text-center'>
                Add a Note
            </h2>
            <form className='row g-3 mt-3' >
                <div className='col-md-6'>
                    <label htmlFor='title' className='form-label'>
                        Title
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='title'
                        name='title'
                        placeholder='Enter Title'
                        onChange={onChange}
                        value={note.title}
                        minLength={5}
                        required style={{ color: 'grey', border: '1px solid grey', borderRadius: '10px' }}
                    />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='tag' className='form-label'>
                        Tag
                    </label>
                    <select className='form-select' id='tag' name='tag' onChange={onChange} value={note.tag} style={{ color: 'grey', border: '1px solid grey', borderRadius: '10px' }}>
                        <option value='default'>Select a tag</option>
                        <option value='personal'>Personal</option>
                        <option value='work'>Work</option>
                        <option value='shopping'>Shopping</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label htmlFor='description' className='form-label'>
                        Description
                    </label>
                    <textarea
                        className='form-control'
                        id='description'
                        name='description'
                        rows='5'
                        onChange={onChange}
                        value={note.description}
                        minLength={5}
                        required
                        placeholder='Enter Description' style={{ color: 'grey', border: '1px solid grey', borderRadius: '10px' }}></textarea>
                </div>
                <div className='col-12 text-center'>
                    <button
                        type='button'
                        className='btn text-white'
                        onClick={handleClick}
                        style={{ borderRadius: '50px', backgroundColor: 'fuchsia' }}
                    >
                        Add Note
                    </button>
                </div>
            </form >
        </div >
    );
}
