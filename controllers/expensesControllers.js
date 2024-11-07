const db = require('../config/db');

// save funtion
exports.saveData = async (req, res) => {
    const { category, price, date, itemname, userId } = req.body; // Include userId

    const insertExpenseQuery = 'INSERT INTO expenses (category, price, date, itemname, user_id) VALUES (?, ?, ?, ?, ?)';

    db.query(insertExpenseQuery, [category, price, date, itemname, userId], (err, result) => {
        if (err) {
            console.error('Error inserting expense:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertId });
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


// controllers/expenseController.js
exports.updateExpense = (req, res) => {
    const { id, category, price, date, itemname } = req.body;

    // Ensure that all necessary fields are provided
    if (!id || !category || !price || !date || !itemname) {
        return res.status(400).json({ error: 'ID, category, price, and date are required' });
    }

    const updateExpenseQuery = 'UPDATE expenses SET category = ?, price = ?, date = ?,  itemname = ? WHERE id = ?';

    db.query(updateExpenseQuery, [category, price, date, itemname, id], (err, result) => {
        if (err) {
            console.error('Error updating expense:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense updated successfully' });
    });
};
