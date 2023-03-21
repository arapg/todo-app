const Joi = require('joi');

exports.loginUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});