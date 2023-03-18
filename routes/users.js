const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const auth = require("../middlewares/auth")

router.get('/', userController.getAllUsers);
router.get('/private', auth, (req, res) => {
    res.status(200).send({ menssage: 'OK' })
})
router.get('/:username', userController.getOneUser);

router.post('/', userController.createNewUser);

router.patch('/', userController.updateOneUser);

router.delete('/:username', userController.deleteOneUser);

router.post('/signIn', userController.signIn);


module.exports = router;
