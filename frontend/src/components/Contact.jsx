import React, { useState } from 'react';

const Contact = (props) => {
    const [data, setData] = useState({ name: '', email: '', message: '' });

    const handleClick = (e) => {
        e.preventDefault();
        if (data.name.length < 3) {
            props.showAlert('Name must be at least 3 characters long', 'danger');
            return;
        }
        if (data.message.length < 5) {
            props.showAlert('Message must be at least 5 characters long', 'danger');
            return;
        }
        props.showAlert('Message sent successfully', 'success');
    };

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    return (
        <div className="container mt-5" style={{ marginBottom: "7%" }}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2>Contact Us</h2>
                    <hr />
                    <p className="lead">
                        We would love to hear from you! If you have any questions or feedback about NoteSync, please feel free to contact us using the form below:
                    </p>
                    <form onSubmit={handleClick}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" required onChange={onChange} value={data.name} name="name" style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" required onChange={onChange} value={data.email} name="email" style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" id="message" rows="5" required onChange={onChange} value={data.message} name="message" style={{ color: 'grey', border: '1px solid grey', borderRadius: '20px' }}></textarea>
                        </div>
                        <button type="submit" className="btn text-white" style={{ borderRadius: '50px', backgroundColor: 'fuchsia' }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
