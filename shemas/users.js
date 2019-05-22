const joi = require('joi');

const defaultSchema = {
    id: joi.number().min(0).required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
};

const notRequiredSchema = {
    id: joi.number().min(0),
    first_name: joi.string(),
    last_name: joi.string(),
}

const onlyIdSchema = {
  id: joi
      .number()
      .min(0)
      .required()
};

module.exports = {
  read: {
    params: onlyIdSchema
  },

  readAll: {},

  create: {
    body: defaultSchema
  },

  update: {
    body: notRequiredSchema,
    params: onlyIdSchema
  },

  delete: {
    params: onlyIdSchema
  }
};