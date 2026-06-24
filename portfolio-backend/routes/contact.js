const express = require('express');
const router = express.Router();
const db = require('../db');
const { validateContact } = require('../middleware/validate');

// POST /contact — Save a contact form submission
router.post('/', validateContact, (req, res) => {
    const { Name, Email, Mobile, Subject, Message } = req.body;

    const sql = `
        INSERT INTO contacts (name, email, mobile, subject, message, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const values = [Name, Email, Mobile || null, Subject, Message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('DB Error (contact insert):', err.message);
            return res.status(500).json({ success: false, message: 'Failed to save message. Try again.' });
        }
        res.status(201).json({ success: true, message: 'Message received! I will get back to you soon.' });
    });
});

module.exports = router;
