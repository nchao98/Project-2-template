//login validations
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .required(),

    email: Joi.string()
        .email({minDomainSegments: 3})
        .required(),
    
    password: Joi.string()
        .min(6)
})


module.exports = schema;

