const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const inappropriateWordsMiddleware = require('../middleware/inappropriateWords');
const authMiddleware = require('../middleware/auth');
const config = require('../config/config');

// Registration
router.post('/register', inappropriateWordsMiddleware, async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created!' });
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET);
        res.json({ token }); 
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
});

// Get protected page content
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ content: 'This is a protected page' });
});

module.exports = router;
