const express = require('express');
const { createDrinksController, getAllDrinksController } = require('../controller/drinksController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/drinks', createDrinksController);

router.get('/drinks',getAllDrinksController);

module.exports = router;