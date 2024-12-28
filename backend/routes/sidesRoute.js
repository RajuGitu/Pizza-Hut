const express = require('express');
const { createSidesController, getAllSidesController } = require('../controller/sidesController');
const router = express.Router();

router.post('/sides', createSidesController);
router.get('/sides', getAllSidesController);

module.exports = router;
