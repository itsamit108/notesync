import React from 'react';

const About = () => {
    return (
        <div className="container mt-5" style={{ marginBottom: "17%" }}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2>About NoteSync</h2>
                    <hr />
                    <p className="lead">
                        NoteSync a simple and easy-to-use tool for managing your notes and keeping them organized. With our app, you can easily create, edit, and delete notes, as well as categorize them for easy access.
                    </p>
                    <p>
                        We believe that taking notes should be as simple and hassle-free as possible, which is why we designed our app with a clean and user-friendly interface. Whether you're a student, a professional, or just someone who likes to stay organized, our app is the perfect solution for all your note taking needs.
                    </p>
                    <p>
                        If you have any questions, comments, or feedback about our app, please don't hesitate to contact us at <a href="mailto:contact@notetakingapp.com">contact@notesync.com</a>. We would love to hear from you!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
