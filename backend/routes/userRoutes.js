const express = require('express');
const { loginUserController, signupUserController, updateUserController, getUserNameController } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyMiddleware');
const router = express.Router();

router.post('/login', loginUserController);
router.post('/signup', signupUserController);
router.put('/forgotpassword', updateUserController);
router.get('/getauthenticate',verifyToken, getUserNameController);

module.exports = router;