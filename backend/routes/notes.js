const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Note = require('../models/Note');
const fetchUser = require('../middleware/fetchUser');

// Route 1: Get all notes using GET "/api/auth/getUser". Login required
router.get('/fetch_all_notes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Route 2: Add a new note using POST "/api/auth/add_note". Login required
router.post(
    '/add_note',
    fetchUser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be at least 5 characters').isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
);

// Route 3: Update an existing note using PUT "/api/auth/update_note". Login required
router.put('/update_note/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not authorized');
        }
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json({ note });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Route 4: Delete an existing note using DELETE "/api/auth/delete_note". Login required
router.delete('/delete_note/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not authorized');
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: 'Note has been deleted', note });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
