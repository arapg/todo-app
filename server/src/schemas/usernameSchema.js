const Joi = require('joi');

exports.usernameSchema = Joi.object({
    username: Joi.string().required()
});