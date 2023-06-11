import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const context = useContext(NoteContext);
    const { name, email, getUser } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center mt-4" style={{ marginBottom: "22%" }}>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header">
                            <h1 className="text-center mb-0 text-muted">Profile</h1>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <p className="form-control" id="name" disabled title="You cannot edit your name on this screen">{name !== null ? name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') : ''}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <p className="form-control" id="email" disabled title="You cannot edit your email on this screen">{email !== null ? email : ''}</p>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <p className="text-center mb-0">Thank you for using our app!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
