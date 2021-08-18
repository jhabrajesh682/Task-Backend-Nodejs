const router = require("express").Router();
const users = require("../controllers/user.controller");
const user = new users();



/****************************************API Routes for users************************************/

router.post("/", user.createUser);

router.post("/auth", user.authenticateUsers);


module.exports = router