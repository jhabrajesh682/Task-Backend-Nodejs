
const jwt = require('jsonwebtoken');
require('dotenv').config();



var jwttoken = function (userId) {

    if (userId) {
        // Generate an access token
        const accessToken = jwt.sign({ userId }, process.env.accessTokenSecret, {
            expiresIn: process.env.JWT_EXPIRY_TIME
        });
        return accessToken;

    } else {
        return 0;
    }
}





module.exports.jwttoken = jwttoken;

