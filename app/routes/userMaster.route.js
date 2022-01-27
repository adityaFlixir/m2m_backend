const express = require("express");
// const router = express.Router()
const userMasterCtrl = require('../controllers/userMaster.controller');
var userMaster = express.Router();
var bodyParser = require("body-parser");
userMaster.use(bodyParser.json());




// const app = express();

//get all user
userMaster.route("/getUsers").get(function (req, res, next) {
    userMasterCtrl.getUserMasters(req, res, next);
  });

  //get one user using userId
  userMaster.route("/getUser/:userId").get(function (req, res, next) {
    userMasterCtrl.getUserMaster(req, res, next);
  });

  
//adding new user
userMaster.route("/addUser").post(function (req, res, next) {
    userMasterCtrl.addUserMaster(req, res, next);
  });

  //update user using userId
  userMaster.route("/updateUser").put(function (req, res, next) {
    userMasterCtrl.updateUserMaster(req, res, next);
  });

  //delete user using userId
  userMaster.route("/deleteUser/:userId").delete(function (req, res, next) {
    userMasterCtrl.deleteUserMaster(req, res, next);
  });

  //pagination
  userMaster.route("/paginationUser").get(function(req,res,next){
    // console.log("innn");
    userMasterCtrl.pagination(req,res,next);
});



module.exports = userMaster;
