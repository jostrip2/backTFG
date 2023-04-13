const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const auth = require("../middlewares/auth")

router.get('/', auth, userController.getUsers);

router.get('/:username', auth, userController.getUser);

router.post('/', auth, userController.createUser);

router.patch('/', auth, userController.updateUser);

router.patch('/pass', auth, userController.updatePassword);

router.delete('/:username', auth, userController.deleteUser);

router.post('/signIn', userController.signIn);


module.exports = router;
