const express = require('express');
const router = express.Router();
const missatgesController = require("../controllers/missatgesController");
const auth = require("../middlewares/auth")

router.get('/:id', auth, missatgesController.getMissatgeById);

router.get('/emissor/:id', auth, missatgesController.getMissatgesByEmissor);

router.get('/receptor/:id', auth, missatgesController.getMissatgesByReceptor);

router.post('/', auth, missatgesController.createMissatge);

router.delete('/:id', auth, missatgesController.deleteMissatge);

router.patch('/', auth, missatgesController.marcarLlegit);

module.exports = router;