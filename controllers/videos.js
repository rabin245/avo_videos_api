const videoService = require("../services/videos");

module.exports.getVideos = async function getVideos(req, res, next) {
  try {
    const data = await videoService.getVideos();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.getVideoById = async function getVideoById(req, res) {
  const data = await videoService.getVideoById(req.params.id);
  res.status(200).json(data);
};
module.exports.createVideo = async function createVideo(req, res) {
  const data = await videoService.postVideo(req.body);
  res.status(200).json(data);
};
