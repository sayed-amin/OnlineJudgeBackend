const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { DBConnection } = require('./config/db.js');
const { router: userRoutes } = require('./routes/userRoutes'); // Import user routes
const authRoutes = require('./routes/AuthenticationRoutes.js');





// Import problem routes

dotenv.config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
DBConnection();



// Routes
app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => res.send('Welcome to the Online Judge API'));



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
