const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Registration API Endpoint
// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         if (!name || !email || !password) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Hash the password
//         // const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert user into the database
//         const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
//         db.query(query, [name, email, password], (err, result) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ error: 'Database error' });
//             }
//             res.status(201).json({ message: 'User registered successfully' });
//         });
//     } catch (error) {
//         console.error('Internal error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
