// chartRoutes.js
const express = require('express');
const router = express.Router();
const {getChartData} = require('../controllers/chartController');

// Define route to get chart data
router.get('/chart-data', getChartData);

module.exports = router;