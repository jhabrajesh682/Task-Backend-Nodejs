const task = require('../controllers/task.controller')
const router = require("express").Router();
const tasks = new task()
const auth = require('../middlewares/auth')

router.post('/createTask', [auth], tasks.createTask);

router.put('/updateStatusOfTask', [auth], tasks.updateStatusOfTask);

router.delete('/deleteTask/:id', [auth], tasks.getOneTaskAndDelete)

router.get('/getAllTask', [auth], tasks.getAllTask);

module.exports = router;