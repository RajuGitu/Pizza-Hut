const express = require('express');
const { createMeltsController, getAllMeltsController } = require('../controller/meltsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/melts', createMeltsController);

router.get('/melts', getAllMeltsController);

module.exports = router;
