const express = require('express');
const router = express.Router();
const assignacioController = require("../controllers/assigacioController");
const auth = require("../middlewares/auth")

router.get('/client/:id', auth, assignacioController.getAssignacionsByClient);

router.get('/:id', auth, assignacioController.getAssignacionsById);

router.post('/', auth, assignacioController.createAssignacions);

router.delete('/:id', auth, assignacioController.deleteAssignacio);

router.patch('/', auth, assignacioController.setRealitzacio);

module.exports = router;