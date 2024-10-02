// Server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('../common/config/dbConfig');
const errorHandler = require('../common/utils/errorHandler');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
require('dotenv').config();

connectDB();
app.use(session({
    secret: 'GOLDSAAMI_BANGARUKONDALU',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
    }
    
}));
app.use(cors({
    origin: ['http://localhost:3003', 'http://localhost:3002'], // Allow all origins
    credentials: true,
  }));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

//Serve the static files for login and register
app.use(express.static(path.join(__dirname, '../../task-frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../task-frontend/build/index.html'));
});

// const PORT =  process.env.PORT || 3001;
const PORT =  3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
