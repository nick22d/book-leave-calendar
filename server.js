const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL username
    password: 'password', // MySQL password
    database: 'leave_management'
});

// Connect to MySQL
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Endpoint to handle leave requests submission
app.post('/submit-leave', (req, res) => {
    const { user_id, leave_dates } = req.body;  // Receive user ID and leave dates

    if (!leave_dates || leave_dates.length === 0) {
        return res.status(400).send('No leave dates selected');
    }

    // Insert each leave date into the database
    leave_dates.forEach(date => {
        const query = 'INSERT INTO leave_requests (user_id, leave_date) VALUES (?, ?)';
        connection.query(query, [user_id, date], (err, result) => {
            if (err) throw err;
            console.log(`Inserted leave date: ${date}`);
        });
    });

    res.send('Leave request submitted');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
