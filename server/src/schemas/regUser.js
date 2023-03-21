const Joi = require('joi');

exports.regUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    confirmedPassword: Joi.any().valid(Joi.ref('password')).required()
});