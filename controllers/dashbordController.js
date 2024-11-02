const db = require('../config/db');

exports.getlast7day = async (req, res) => {
    const query = `
      SELECT category, DATE(date) as date, SUM(amount) as total
      FROM expenses
      WHERE date >= CURDATE() - INTERVAL 6 DAY
      GROUP BY category, DATE(date)
      ORDER BY DATE(date) ASC;
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
};