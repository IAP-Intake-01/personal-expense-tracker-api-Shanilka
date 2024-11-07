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
const getMonthlyExpenses = async (userEmail, monthOffset) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(price) AS total
            FROM expenses
            WHERE userEmail = ?
            AND MONTH(date) = MONTH(CURDATE() - INTERVAL ${monthOffset} MONTH)
            AND YEAR(date) = YEAR(CURDATE() - INTERVAL ${monthOffset} MONTH);
        `;
        db.query(query, [userEmail], (err, results) => {
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
    const userEmail = req.params.userEmail;

    try {
        // Get current and previous month totals
        const currentMonthTotal = await getMonthlyExpenses(userEmail, 0);  // Current month
        const previousMonthTotal = await getMonthlyExpenses(userEmail, 1);  // Previous month

        // SQL query to get the average of the last 12 months' expenses
        const averageQuery = `
            SELECT AVG(monthly_total) AS average
            FROM (
                SELECT SUM(price) AS monthly_total
                FROM expenses
                WHERE userEmail = ?
                GROUP BY YEAR(date), MONTH(date)
                ORDER BY YEAR(date) DESC, MONTH(date) DESC
                LIMIT 12
            ) AS monthly_totals;
        `;

        db.query(averageQuery, [userEmail], (err, results) => {
            if (err) {
                console.error("Database error in averageQuery:", err);
                return res.status(500).json({ error: 'Database error in averageQuery' });
            }

            const average = results[0].average || 0;
            const growthPercentage = previousMonthTotal
                ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal * 100).toFixed(1)
                : 0;

            res.json({
                userEmail,
                currentMonthTotal,
                previousMonthTotal,
                average,
                growthPercentage,
            });
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};


exports.getCatogoryTotal = (req, res) => {
    const userEmail = req.params.userEmail;  // Get the user email from the URL parameter

    // SQL query to get the total expenses per category for the specific user
    const query = `
        SELECT category, SUM(price) AS total_price
        FROM expenses
        WHERE userEmail = ?  -- Filter by user email
        AND category IN ('Foods', 'Transport', 'Education', 'Shopping', 'Other')  -- Ensure correct categories
        GROUP BY category
    `;

    // Query execution
    db.query(query, [userEmail], (error, results) => {
        if (error) {
            console.error('Error fetching category totals:', error);
            return res.status(500).json({ error: 'Failed to retrieve category totals' });
        }

        // Send the results to the frontend
        res.json(results);
    });
};



// getExpensesTotal
// entertainment