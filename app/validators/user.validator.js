const joi = require("@hapi/joi");

function validateUsers(user) {
    let schema = joi.object({
        Name: joi.string().required(),
        roleName: joi.string().required(),
        Email: joi.string().email().required(),
        username: joi.string().required(),
        password: joi.string().min(8).required()
    })
    let result = schema.validate(user)

    return result
}


function authenticateUser(user) {
    let schema = joi.object({
        Email: joi.string().required(),
        password: joi.string().required()
    })
    let result = schema.validate(user)
    return result
}


module.exports.validateUsers = validateUsers
module.exports.authenticateUser = authenticateUser