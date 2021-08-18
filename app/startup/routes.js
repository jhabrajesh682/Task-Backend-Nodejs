const express = require("express")
const morgan = require('morgan')
var cors = require('cors');
const _admin_folder = 'adminDashboard';
const error = require('../middlewares/error.middleware')
require('express-async-errors');
module.exports = function (server) {


  server.use(morgan('tiny'))
  server.use(express.json({ limit: "50mb" }));
  server.use(express.urlencoded({ limit: "50mb", extended: true }));

  server.use(cors())

  /************************************ API END POINTS*************************************/

  server.use("/api/v1/user", require("../routes/user.routes"));
  server.use('/api/v1/task', require('../routes/task.routes'))

  server.get('*.*', express.static(_admin_folder, { maxAge: '1y' }));

  server.all('*', function (req, res) {
    res.status(200).sendFile(`/`, { root: _admin_folder });
  });
  server.use(error)

}