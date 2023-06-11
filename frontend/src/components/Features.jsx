import React from 'react';

const Features = () => {
    return (
        <div className="container mt-5" style={{ marginBottom: "7%" }}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2>Features of NoteSync</h2>
                    <hr />
                    <p className="lead">
                        NoteSync is packed with features to make note taking a breeze. Here are just a few of the things you can do with our app:
                    </p>
                    <ul>
                        <li>Create, edit, and delete notes</li>
                        <li>Categorize notes for easy access</li>
                        <li>Search notes by keyword</li>
                        <li>Sync notes across multiple devices</li>
                        <li>Secure your notes with a password</li>
                        <li>Attach files and images to your notes</li>
                    </ul>
                    <p>
                        These are just some of the many features available in our app. We are always working to improve and add new features based on feedback from our users.
                    </p>
                    <h4>Try It Out Today</h4>
                    <p>
                        NoteSync is free to use. Sign up for an account today and start taking notes!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;
