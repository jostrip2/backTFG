const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getOneUser);
router.post('/', userController.createNewUser);
router.patch('/', userController.updateOneUser);
router.delete('/:username', userController.deleteOneUser);
router.post('/login', userController.login);

module.exports = router;
