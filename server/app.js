const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add CORS if needed
const config = require('./config/config');
const authRoutes = require('./routes/auth'); 

const app = express();

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB: ', err));

// Routes
app.use('/api', authRoutes);

// Error handling (Example: Place this at the end of your routes)
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: "Something went wrong" });
});

// Start the server
const port = process.env.PORT || 8000; // Use environment variable for port if available
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
