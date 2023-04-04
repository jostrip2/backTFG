const express = require('express');
const router = express.Router();
const videoController = require("../controllers/videoController");
const auth = require("../middlewares/auth")

router.get('/', /*auth,*/ videoController.getVideos);

router.get('/:id', /*auth,*/ videoController.getVideo);

router.post('/', /*auth,*/ videoController.createVideo);

router.patch('/', /*auth,*/ videoController.updateVideo);

router.delete('/:id', /*auth,*/ videoController.deleteVideo);

module.exports = router;
