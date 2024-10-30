const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shanilka800@#',
    database: 'my_expenses'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Registration API
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
