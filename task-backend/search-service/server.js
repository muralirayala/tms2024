// Server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('../common/config/dbConfig');
const errorHandler = require('../common/utils/errorHandler');
// const authMiddleware = require('../common/middlewares/authMiddleware');

const searchRoutes = require('./routes/searchRoutes');
const app = express();
require('dotenv').config();

connectDB();

app.use(cors({
    origin: ['http://localhost:3003', 'http://localhost:3002', 'http://localhost:3001'],
    credentials: true,
  }));
  

app.use(express.json());
app.use(errorHandler);


app.use('/api/search', searchRoutes);

//Serve the static files for login and register
app.use(express.static(path.join(__dirname, '../../task-frontend/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../task-frontend/build/index.html'));
});


const PORT =  process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

