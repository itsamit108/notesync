import React from 'react';

const Error = () => {
    return (
        <div className="container mt-5" style={{ marginBottom: "29%" }}>
            <div className="row">
                <div className="col-md-8 offset-md-2 text-center">
                    <h2>Oops! Something went wrong.</h2>
                    <p>We're sorry, but there was an error processing your request.</p>
                    <p>Please try again later or contact us if the problem persists.</p>
                </div>
            </div>
        </div>
    );
};

export default Error;
