const express = require('express');
const router = express.Router();
const missatgesController = require("../controllers/missatgesController");
const auth = require("../middlewares/auth")

router.get('/:id', auth, missatgesController.getMissatgeById);

router.get('/emisor/:id', auth, missatgesController.getMissatgesByEmisor);

router.get('/receptor/:id', auth, missatgesController.getMissatgesByReceptor);

router.post('/:id', auth, missatgesController.createMissatge);

router.delete('/', auth, missatgesController.deleteMissatge);

module.exports = router;