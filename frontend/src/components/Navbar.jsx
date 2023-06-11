import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

export default function Navbar() {
    const location = useLocation();

    const navigate = useNavigate();

    const { name } = useContext(NoteContext);

    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        navigate('/login');
    };

    const greeting = () => {
        let myDate = new Date();
        let hrs = myDate.getHours();

        if (hrs < 12) return 'Good Morning';
        else if (hrs >= 12 && hrs <= 17) return 'Good Afternoon';
        else if (hrs >= 17 && hrs <= 24) return 'Good Evening';
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        NoteSync
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/' ? 'active' : ''
                                        }`}
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/about' ? 'active' : ''
                                        }`}
                                    to="about"
                                >
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/features' ? 'active' : ''
                                        }`}
                                    to="features"
                                >
                                    Features
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/contact' ? 'active' : ''
                                        }`}
                                    to="contact"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? (
                            <form className="d-flex ms-auto">
                                <Link
                                    className="btn btn-outline-success mx-2 text-white"
                                    to="/login"
                                    role="button"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="btn btn-outline-success mx-2 text-white"
                                    to="/signup"
                                    role="button"
                                >
                                    Signup
                                </Link>
                            </form>
                        ) : (
                            <>
                                <div className="d-flex ms-auto">
                                    <div className="btn text-white">
                                        <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
                                            {greeting()}, {name}
                                        </Link>
                                    </div>
                                    <button className="btn btn-outline-success mx-2 text-white" onClick={handleClick}>Logout</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
