const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true
    },

    roleName: {
        type: String,
        enum: ['admin', 'users'],
        required: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        timestamps: true
    });


module.exports = users = mongoose.model("TaskUser", userSchema);