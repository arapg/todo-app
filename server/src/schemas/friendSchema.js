const Joi = require('joi');

exports.friendSchema = Joi.object({
    friend: Joi.string().required()
});