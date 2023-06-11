import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';


const Signup = (props) => {
    const { getUser } = useContext(NoteContext);
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (credentials.name.length < 3) {
            props.showAlert('Name must be at least 3 characters long', 'danger');
            return;
        }
        if (credentials.password.length < 8) {
            props.showAlert('Password must be at least 8 characters long', 'danger');
            return;
        }
        if (credentials.password !== credentials.confirmPassword) {
            props.showAlert('Passwords do not match', 'danger');
            return;
        }
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.authToken);
            getUser();
            props.showAlert('Account created successfully', 'success');
            navigate('/');
        }
        else {
            props.showAlert(data.error, 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={{ marginBottom: '10%' }}>
            <div className="row justify-content-center mt-5" >
                <div className="col-md-4">
                    <div className="card" style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }}>
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Signup</h4>
                            <form onSubmit={handleClick}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Enter name" value={credentials.name} name="name" onChange={onChange} style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" value={credentials.email} name="email" onChange={onChange} style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" value={credentials.password} name="password" onChange={onChange} style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" placeholder="Confirm password" value={credentials.confirmPassword} name="confirmPassword" onChange={onChange} style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                                </div>
                                <button type="submit" className="btn text-white btn-block mt-3" style={{ borderRadius: '50px', backgroundColor: 'fuchsia' }}>Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
