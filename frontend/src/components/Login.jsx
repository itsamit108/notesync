import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const Login = (props) => {
    const { getUser } = useContext(NoteContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.authToken);
            getUser();
            props.showAlert('Logged in successfully', 'success');
            navigate('/');
        } else {
            props.showAlert('Invalid credentials', 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={{ marginBottom: '19%' }}>
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <div className="card" style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }}>
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Login</h4>
                            <form onSubmit={handleClick}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" value={credentials.email} name="email" onChange={onChange} style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" value={credentials.password} name="password" onChange={onChange} style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                                </div>
                                <button type="submit" className="btn text-white btn-block mt-3" style={{ borderRadius: '50px', backgroundColor: 'fuchsia' }}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
