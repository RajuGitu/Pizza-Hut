const express = require('express');
const { pizzasCreateController, getAllPizzasController } = require('../controller/pizzasController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/pizzas', pizzasCreateController);

router.get('/pizzas', getAllPizzasController);




module.exports = router;