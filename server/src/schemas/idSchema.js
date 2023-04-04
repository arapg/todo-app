const Joi = require('joi');

exports.idSchema = Joi.object({
    id: Joi.number().integer().required()
});