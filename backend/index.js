const express = require('express');
const cors = require('cors');
const db = require('./config/database.js');
const notesRoute = require('./routes/notesRoute.js');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use(notesRoute);

// Test and sync database
(async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');
        await db.sync(); 
    } catch (error) {
        console.error('Connection error:', error);
    }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
