const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAdminKey } = require('../middleware/auth');

// GET /admin/messages — View all contact submissions (protected by API key)
router.get('/messages', requireAdminKey, (req, res) => {
    const sql = `SELECT * FROM contacts ORDER BY created_at DESC`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('DB Error (fetch messages):', err.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
        }
        res.json({ success: true, count: results.length, messages: results });
    });
});

// DELETE /admin/messages/:id — Delete a specific message
router.delete('/messages/:id', requireAdminKey, (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ success: false, message: 'Invalid message ID.' });
    }

    const sql = `DELETE FROM contacts WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('DB Error (delete message):', err.message);
            return res.status(500).json({ success: false, message: 'Failed to delete message.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Message not found.' });
        }
        res.json({ success: true, message: 'Message deleted.' });
    });
});

module.exports = router;
