// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Fix the spelling here

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // Use routes under /api path

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
