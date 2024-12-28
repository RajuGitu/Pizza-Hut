const express = require('express');
const { createDessertsController, getAllDessertsController } = require('../controller/dessertsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/desserts', createDessertsController);

router.get('/desserts', getAllDessertsController);

module.exports = router;
