const videos = require("../routes/videos");

module.exports = function (app) {
  app.use("/api/videos", videos);
};
