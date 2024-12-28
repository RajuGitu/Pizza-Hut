const express = require('express');
const { addToCartController, getAllCartController, updateAddititonSubtractController, deleteCartController } = require('../controller/addcartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/addcart',authMiddleware, addToCartController);
router.get('/addcart',authMiddleware, getAllCartController);
router.put('/addcart',authMiddleware, updateAddititonSubtractController);
router.delete('/addcart',authMiddleware, deleteCartController);

module.exports = router;