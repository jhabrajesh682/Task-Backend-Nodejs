const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({


    taskName: {
        type: String,
        required: true
    },

    taskDescription: {
        type: String,
        required: true
    },

    taskStatus: {
        type: String,
        enum: ['remaining', 'completed']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('task', taskSchema)