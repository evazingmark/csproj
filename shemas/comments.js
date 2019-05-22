const joi = require('joi');

const defaultSchema = {
    filmId: joi.number().min(0).required(),
    userId: joi.number().min(0).required(),
    message: joi.string().required()     
};

const notRequiredSchema = {
    filmId: joi.number().min(0),
    userId: joi.number().min(0),
    message: joi.string()  
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