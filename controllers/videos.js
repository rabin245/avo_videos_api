const videoService = require("../services/videos");

module.exports.getVideos = async function getVideos(req, res, next) {
  try {
    const data = await videoService.getVideos();

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.getVideoById = async function getVideoById(req, res, next) {
  try {
    const data = await videoService.getVideoById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports.createVideo = async function createVideo(req, res, next) {
  try {
    const data = await videoService.postVideo(req.body);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports.updateVideo = async function updateVideo(req, res, next) {
  try {
    const data = await videoService.updateVideo(req.params.id, req.body);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteVideo = async function deleteVideo(req, res, next) {
  try {
    const data = await videoService.deleteVideo(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports.updateVideoStatus = async function updateVideoStatus(
  req,
  res,
  next
) {
  try {
    const data = await videoService.updateVideoStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
