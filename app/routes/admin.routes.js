// const adminCtrl = require("../controllers/admin.controllers");
const adminCtrl = require("../controllers/admin.controller");
var express = require("express");
var bodyParser = require("body-parser");
var admin = express.Router();
var middleware = require("./app.routes");
admin.use(bodyParser.json());

admin.route("/create").post(function (req, res, next) {
  adminCtrl.createAdmin(req, res, next);
});
admin.route("/get").get(function (req, res, next) {
  adminCtrl.fetchAdminDetails(req, res, next);
});
// admin.route("/update").put(function (req, res, next) {
//   adminCtrl.updateAdminDetails(req, res, next);
// });
// admin.route("/remove").delete(function (req, res, next) {
//   adminCtrl.removeAdminDetails(req, res, next);
// });
admin.route("/login").post(function (req, res, next) {
  adminCtrl.adminLogin(req, res, next);
});



module.exports = admin;
