const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config/config");
const upload = require("express-fileupload");

//const RoleRoute = require('./app/routes/role.routes');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(upload());
app.use(bodyParser.urlencoded({ limit: "50mb" }));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));
const appRouter = require("./app/routes/app.routes");
appRouter.initialize(app);
/* Request Middleware */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "token");
  res.header("Access-Control-Max-Age", "10000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));
// Configuring the database
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(config.dbUrl, { useFindAndModify: false })
  .then(() => {
    console.log("Successfully connected to the database:", config.dbUrl);
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
// listen for requests
app.listen(config.serverPort, () => {
  console.log("Server is listening on port ", config.serverPort);
});

module.exports = app;

//app.use('/api/role.route',RoleRoute);
