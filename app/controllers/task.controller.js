const tasks = require('../models/task.model');
const validator = require('../validators/task.validator')



class task {

    async createTask(req, res) {

        try {
            let { error } = validator.validateAddTask(req.body)

            if (error) {
                return res.status(400).send({
                    message: 'Failed',
                    status: false,
                    error: error
                })
            }

            let createTask = new tasks({
                ...req.body
            })
            createTask.taskStatus = 'remaining'
            await createTask.save();

            return res.status(200).send({
                status: true,
                message: 'task is successfully created'
            })
        } catch (error) {
            return res.status(400).send({
                message: 'Failed',
                status: false,
                error: error
            })
        }


    }

    async updateStatusOfTask(req, res) {

        try {
            let { error } = validator.validateUpdateStatusOfTasks(req.body);

            if (error) {
                res.status(400).send({
                    status: false,
                    message: 'failed',
                    error: error
                })
            }

            let isTaskExist = await tasks.findById(req.body.taskId).lean()
            if (!isTaskExist) {
                return res.status(404).send({
                    status: false,
                    message: 'task not found'
                })
            }

            await tasks.updateOne({ _id: req.body.taskId }, {
                taskStatus: req.body.taskStatus
            })

            return res.status(200).send({
                status: true,
                message: 'task status updated successfully'
            })
        } catch (error) {
            return res.status(400).send({
                message: 'failed',
                status: false,
                error: error
            })
        }


    }

    async getOneTaskAndDelete(req, res) {

        let isTaskExist = await tasks.findById(req.params.id).lean()

        if (!isTaskExist || !req.params.id) {
            return res.status(404).send({
                status: false,
                message: 'task not found'
            })
        }
        await tasks.findByIdAndRemove(req.params.id)

        return res.status(200).send({
            status: true,
            message: 'task is successfully deleted'
        })
    }

    async getAllTask(req, res) {

        let limit
        let page
        if (req.query.limit) {
            limit = (parseInt(req.query.limit) ? parseInt(req.query.limit) : 10);
            page = req.query.page ? (parseInt(req.query.page) ? parseInt(req.query.page) : 1) : 1;
        }

        let taskData = await tasks.find({}).
            sort({ _id: -1 })
            .limit(limit)
            .lean()

        return res.status(200).send({
            status: true,
            result: taskData
        })
    }
}

module.exports = task