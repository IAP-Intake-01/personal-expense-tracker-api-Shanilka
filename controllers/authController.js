const db = require('../config/db');
const bcrypt = require('bcrypt');

// Registration function
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

        db.query(query, [name, email, password], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Internal error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// exports.login = (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required' });
//     }

//     const query = 'SELECT * FROM users WHERE email = ?';
//     db.query(query, [email], async (err, results) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }

//         const user = results[0];

//         // Check password
//         const isMatch = await (password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }

//         // // Generate a unique token for the session
//         // const token = crypto.randomBytes(16).toString('hex');

//         // Store the token in the database associated with the user
//         const updateQuery = 'UPDATE users SET token = ? WHERE id = ?';
//         db.query(updateQuery, [token, user.id], (err, result) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ error: 'Database error' });
//             }

//             // Send the token to the client to be stored in localStorage
//             res.json({ token });
//         });
//     });
// };
