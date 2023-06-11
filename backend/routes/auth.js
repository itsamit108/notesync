const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'secret';
const fetchUser = require('../middleware/fetchUser');

// Route 1: Create a new user using POST "/api/auth/createUser".
router.post('/signup', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const data = {
            user: { id: user.id }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Route 2: Authenticate a user using POST "/api/auth/login".
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').exists().withMessage('Password is required')
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            success = false;
            return res.status(400).json({ success, error: 'Invalid credentials' });
        }

        const payload = {
            user: { id: user.id }
        };

        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Route 3: Get logged-in user details using POST "/api/auth/getUser".
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
