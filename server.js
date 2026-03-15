const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'portfolio'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

app.post('/contact', (req, res) => {

    const { Name, Email, Mobile, Subject, Message } = req.body;

    const sql = "INSERT INTO contact(name, email, mobile, subject, message) VALUES (?, ?, ?, ?, ?)";
    const values = [Name, Email, Mobile, Subject, Message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Database Error" });
        }
        res.status(200).send({ message: "Message saved successfully!" });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});