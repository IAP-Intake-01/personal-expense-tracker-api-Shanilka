const db = require('../config/db');

exports.getlast7day = async (req, res) => {
    const query = `
      SELECT 
    category, 
    SUM(price) AS total 
FROM 
    expenses
WHERE 
    date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
GROUP BY 
    category;


    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
};


exports.getCatagorySum = (req, res) => {
    const query = `
        SELECT 
    category, 
    SUM(price) AS total
FROM 
    expenses
WHERE 
    date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY 
    category;

    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Database query error' });
        } else {
            // Format results as expected for the Pie chart
            const formattedResults = results.map(row => ({
                name: row.category,
                value: row.total,
            }));
            res.json(formattedResults);
        }
    });
};