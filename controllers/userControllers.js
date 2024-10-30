const db = require('../config/db');

exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(200).json(results);
    });
};