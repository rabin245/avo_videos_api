const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videos");
const validator = require("../utils/validator");
const videoSchema = require("../schema/videos");

router.get("/", videoController.getVideos);
router.get("/:id", videoController.getVideoById);
router.post("/", validator.body(videoSchema), videoController.createVideo);
router.put("/:id", validator.body(videoSchema), videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);
router.patch("/:id/status", videoController.updateVideoStatus);

module.exports = router;
