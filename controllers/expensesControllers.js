const db = require('../config/db');

exports.saveData = async (req, res) => {
    const { category, price, date } = req.body;

    try {
        if (!category || !price || !date) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const query = 'INSERT INTO expenses (category, price, date) VALUES (?,?,?)';

        db.query(query, [category, price, date], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Data Save successfully' });
        });
    } catch (error) {
        console.error('Internal error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getAllExpenses = (req, res) => {
    const query = 'SELECT * FROM expenses';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
};
