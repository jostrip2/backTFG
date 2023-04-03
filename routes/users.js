const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const auth = require("../middlewares/auth")

router.get('/', auth, userController.getAllUsers);
router.get('/private', auth, (req, res) => {
    res.status(200).send({ menssage: 'OK' })
})
router.get('/:username', auth, userController.getOneUser);

router.post('/', auth, userController.createNewUser);

router.patch('/', auth, userController.updateOneUser);

router.patch('/pass', auth, userController.updatePassword);

router.delete('/:username', auth, userController.deleteOneUser);

router.post('/signIn', userController.signIn);


module.exports = router;
