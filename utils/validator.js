const isEmpty = require("lodash").isEmpty;

function validate(data, schema) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (!isEmpty(error)) {
    return Promise.reject(error);
  }

  return Promise.resolve(value);
}

function body(validator) {
  return (req, res, next) => {
    return validate(req.body, validator)
      .then(() => next())
      .catch(next);
  };
}

module.exports = { body };
