const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password
    // bcrypt.hash(password, 10, (err, hash) => {
    //     if (err) {
    //         return res.status(500).json({ error: err });
    //     }

    // Store user in the database
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
};

// exports.login = (req, res) => {
//     const { email, password } = req.body;

//     const query = 'SELECT * FROM users WHERE email = ?';
//     db.query(query, [email], (error, results) => {
//         if (error || results.length === 0) {
//             return res.status(401).json({ message: 'Auth failed' });
//         }

//         // Compare passwords
//         bcrypt.compare(password, results[0].password, (err, isMatch) => {
//             if (err || !isMatch) {
//                 return res.status(401).json({ message: 'Auth failed' });
//             }
//             res.status(200).json({ message: 'Auth successful' });
//         });
//     });
// };
