require("dotenv/config");

require("./db");

const express = require("express");
const req = require("express/lib/request");

const app = express();

require("./config")(app);
require("./config/session.config")(app);

const projectName = "PadelReserva";

app.locals.appTitle = projectName

// if (req.session.currentUser.role === 'ADMIN') {
//     req.app.locals.isAdmin = true
// } else {
//     req.app.locals.isAdmin = false 
// }

// app.locals.isAdmin = role

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;
