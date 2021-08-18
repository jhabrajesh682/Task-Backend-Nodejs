const userModal = require("../models/user.model");
const validate = require("../validators/user.validator");
const bcrypt = require("bcrypt");
const jwt = require('../helper/jwt')

class User {

    async createUser(req, res) {

        let { error } = validate.validateUsers(req.body);

        if (error) {
            return res.status(400).send({
                status: false,
                message: "something is wrong",
                result: error
            })
        }
        let user = new userModal({
            ...req.body
        })

        let isEmailExist = await userModal.findOne({ Email: req.body.Email }).lean();
        if (isEmailExist) {
            return res.status(400).send({
                status: false,
                message: 'Email Id already Exist'
            })
        }

        //Encryption of password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        await user.save();


        return res.status(200).send({
            status: true,
            message: "user successfully created",
            result: user
        })
    }


    async authenticateUsers(req, res) {

        let { error } = validate.authenticateUser(req.body)

        if (error) {
            return res.status(400).send({
                status: false,
                message: "Failed 🧐",
                result: error
            });
        }
        let user = await userModal.findOne({ Email: req.body.Email }).lean()

        if (!user || user === null) {
            return res.status(404).send({
                message: "user not found",
                status: false,
                Email: req.body.Email
            })
        }
        let validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!validatePassword) {
            return res.status(400).send({
                message: "pls enter correct password",
                status: false,
                Email: req.body.Email
            })
        }
        //create JWT token when user login and save Email and userId of user
        let token = jwt.jwttoken(user._id);


        return res.status(200).send({
            status: true,
            message: "user successfully logged in",
            token: token,
            user: user
        })
    }


}
module.exports = User