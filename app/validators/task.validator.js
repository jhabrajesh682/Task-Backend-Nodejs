const joi = require("@hapi/joi");


function validateAddTask(task) {
    let schema = joi.object({
        taskName: joi.string().required(),
        taskDescription: joi.string().required(),
        taskStatus: joi.string()
    })

    let result = schema.validate(task)
    return result
}

function validateUpdateStatusOfTasks(task) {
    let schema = joi.object({
        taskId: joi.string().required(),
        taskStatus: joi.string().required()
    })

    let result = schema.validate(task)
    return result
}

module.exports.validateAddTask = validateAddTask
module.exports.validateUpdateStatusOfTasks = validateUpdateStatusOfTasks