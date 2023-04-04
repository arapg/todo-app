const Joi = require('joi');

exports.titleSchema = Joi.object({
    title: Joi.string().required()
});