import React from 'react';
import NoteList from './NoteList';

export default function Home(props) {
    return (
        <>
            <div className="container" style={{ marginBottom: "10%" }}>
                <NoteList showAlert={props.showAlert} />
            </div>
        </>
    );
}
