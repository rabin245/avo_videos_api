const Joi = require("joi");

const video_list = Joi.object().keys({
  name: Joi.string().required(),
  link: Joi.string().required(),
});

const videoSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  active: Joi.number().integer().min(0).max(1).default(1),
  video_list: Joi.array().items(video_list),
});

module.exports = videoSchema;
