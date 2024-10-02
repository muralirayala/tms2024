// Server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('../common/config/dbConfig');
const errorHandler = require('../common/utils/errorHandler');
const authMiddleware = require('../common/middlewares/authMiddleware');

const taskRoutes = require('./routes/taskRoutes');
const app = express();
require('dotenv').config();

connectDB();

app.use(cors({
    origin: 'http://localhost:3001', // Allow all origins
    credentials: true,
  }));
  

app.use(express.json());
app.use(errorHandler);


app.use('/api', authMiddleware, taskRoutes);

//Serve the static files for login and register
app.use(express.static(path.join(__dirname, '../../task-frontend/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../task-frontend/build/index.html'));
});


// const PORT =  process.env.PORT || 3002;
const PORT =  3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

