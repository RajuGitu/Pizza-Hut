const express = require('express');
const { createPastasController, getAllPastasController } = require('../controller/pastasController');
const router = express.Router();

router.post('/pastas', createPastasController);
router.get('/pastas', getAllPastasController);

module.exports = router;
