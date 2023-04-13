const express = require('express');
const router = express.Router();
const assignacioController = require("../controllers/assigacioController");
const auth = require("../middlewares/auth")

router.get('/:idClient', /*auth,*/ assignacioController.getAssignacionsByClient);

router.get('/:idVideo', /*auth,*/ assignacioController.getAssignacionsByVideo);

router.get('/:id', /*auth,*/ assignacioController.getAssignacionsById);

router.post('/', /*auth,*/ assignacioController.createAssignacio);

// router.patch('/', /*auth,*/ assignacioController.updateAssignacio);

// router.delete('/:id', /*auth,*/ assignacioController.deleteAssignacio);

module.exports = router;