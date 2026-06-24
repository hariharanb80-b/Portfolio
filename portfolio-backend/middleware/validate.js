function validateContact(req, res, next) {
    const { Name, Email, Subject, Message } = req.body;

    if (!Name || Name.trim().length < 2) {
        return res.status(400).json({ success: false, message: 'Please enter a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email || !emailRegex.test(Email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (!Subject || Subject.trim().length < 3) {
        return res.status(400).json({ success: false, message: 'Subject must be at least 3 characters.' });
    }

    if (!Message || Message.trim().length < 10) {
        return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
    }

    // Sanitize (trim whitespace)
    req.body.Name = Name.trim();
    req.body.Email = Email.trim().toLowerCase();
    req.body.Subject = Subject.trim();
    req.body.Message = Message.trim();

    next();
}

module.exports = { validateContact };
