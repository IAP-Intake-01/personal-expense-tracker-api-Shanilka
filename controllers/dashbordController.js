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


exports.getCatagorySum = async (req, res) => {
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

// Backend code
const getMonthlyExpenses = async (monthOffset) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(price) AS total
            FROM expenses
            WHERE MONTH(date) = MONTH(CURDATE() - INTERVAL ${monthOffset} MONTH)
              AND YEAR(date) = YEAR(CURDATE() - INTERVAL ${monthOffset} MONTH);
        `;
        db.query(query, (err, results) => {
            if (err) {
                console.error("Database error in getMonthlyExpenses for monthOffset " + monthOffset, err);
                reject(err);
            } else {
                resolve(results[0].total || 0);
            }
        });
    });
};

exports.getExpensesTotal = async (req, res) => {
    try {
        const currentMonthTotal = await getMonthlyExpenses(0);
        const previousMonthTotal = await getMonthlyExpenses(1);

        // Average calculation (example: over the last 12 months)
        const averageQuery = `
            SELECT AVG(monthly_total) AS average
            FROM (
            SELECT SUM(price) AS monthly_total
            FROM expenses
            GROUP BY YEAR(date), MONTH(date)
            ORDER BY YEAR(date) DESC, MONTH(date) DESC
            LIMIT 12
            ) AS monthly_totals;

        `;

        db.query(averageQuery, (err, results) => {
            if (err) {
                console.error("Database error in averageQuery:", err);
                res.status(500).json({ error: 'Database error in averageQuery' });
                return;
            }

            const average = results[0].average || 0;
            const growthPercentage = previousMonthTotal
                ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal * 100).toFixed(1)
                : 0;

            res.json({
                currentMonthTotal,
                previousMonthTotal,
                average,
                growthPercentage,
            });
        });
    } catch (error) {
        console.error("Failed to fetch data in /expense-summary:", error);
        res.status(500).json({ error: 'Failed to fetch data in /expense-summary' });
    }
};

exports.getCatogoryTotalPrice = async (req, res) => {
    try {
        const [results] = await db.execute(`
            SELECT category, SUM(price) AS total_price
            FROM expenses
            WHERE category IN ('food', 'transport', 'education', 'entertainment', 'other')
            GROUP BY category
        `);
        res.json(results);
    } catch (error) {
        console.error('Error fetching category totals:', error);
        res.status(500).json({ error: 'Failed to retrieve category totals' });
    }
};


// getExpensesTotal