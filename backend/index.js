const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

// Connect to MongoDB
connectToMongo();

// Initialize the express app
const app = express();

// Define the server port
const port = 5000;

// Middleware for parsing JSON request bodies
app.use(cors());
app.use(express.json());

// Mount the authentication and notes routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
