const joi = require('joi');

const defaultSchema = {
    name: joi.string().required(),
    name_original: joi.string(),
    genre: joi.string().required(),
    country: joi.string().required(),
    age_limit: joi.number().min(0).max(21).required(),
    plot: joi.string().required(),
    release_date: joi.date().required(),
    release_bel: joi.date().required(),
    release_rus: joi.date().required(),
    in_roles: joi.string().required(),
    director: joi.string().required(),
    film_script: joi.string(), //сценарист
    music: joi.string(),
    operator: joi.string(),
    producer: joi.string(),
    company: joi.string(),
    file: joi.object()
};

const notRequiredSchema = {
    name: joi.string(),
    name_original: joi.string(),
    genre: joi.string(),
    country: joi.string(),
    age_limit: joi.number().min(0).max(21),
    plot: joi.string(),
    release_date: joi.date(),
    release_bel: joi.date(),
    release_rus: joi.date(),
    in_roles: joi.string(),
    director: joi.string(),
    film_script: joi.string(), //сценарист
    music: joi.string(),
    operator: joi.string(),
    producer: joi.string(),
    company: joi.string(),
    file: joi.object()
};

const onlyIdSchema = {
    id: joi
        .number()
        .min(0)
        .required()
};

const find = {
    name: joi.string().required()
};

module.exports = {
    read: {
      params: onlyIdSchema
    },
  
    readAll: {},
    
    find: {
      query: find
    },

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