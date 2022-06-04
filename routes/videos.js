const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videos");

router.get("/", videoController.getVideos);
router.get("/:id", videoController.getVideoById);
router.post("/", videoController.createVideo);
// update video (put)
// update status (patch /:id/status)
// delete video (delete)
// todo: transaction

module.exports = router;
