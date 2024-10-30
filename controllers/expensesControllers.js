const db = require('../config/db');

// save funtion
exports.saveData = async (req, res) => {
    const { category, price, date } = req.body;

    const getMaxIdQuery = 'SELECT COALESCE(MAX(id), 0) + 1 AS newId FROM expenses';
    const insertExpenseQuery = 'INSERT INTO expenses (id, category, price, date) VALUES (?, ?, ?, ?)';

    db.query(getMaxIdQuery, (err, result) => {
        if (err) {
            console.error('Error retrieving max ID:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const newId = result[0].newId;

        db.query(insertExpenseQuery, [newId, category, price, date], (err, result) => {
            if (err) {
                console.error('Error inserting expense:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Expense added successfully', expenseId: newId });
        });
    });
};

//  getAll funtion
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

// delete funtion
exports.deleteExpense = (req, res) => {
    const expenseId = req.params.id;
    const query = 'DELETE FROM expenses WHERE id = ?';

    db.query(query, [expenseId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    });
};