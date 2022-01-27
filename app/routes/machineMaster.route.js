const express = require("express");
// const router = express.Router()
const machineMasterCtrl = require('../controllers/machineMaster.controller');
var machineMaster = express.Router();
var bodyParser = require("body-parser");
machineMaster.use(bodyParser.json());


//get all machine
machineMaster.route("/getMachines").get(function (req, res, next) {
    machineMasterCtrl.getMachineMasters(req, res, next);
  });

  //get one machine using machineId
  machineMaster.route("/getMachine/:machineId").get(function (req, res, next) {
    machineMasterCtrl.getMachineMaster(req, res, next);
  });

  //adding new machine
machineMaster.route("/addMachine").post(function (req, res, next) {
    machineMasterCtrl.addMachineMaster(req, res, next);
  });

  //update machine using machineId
  machineMaster.route("/updateMachine").put(function (req, res, next) {
    machineMasterCtrl.updateMachineMaster(req, res, next);
  });

   //delete user using userId
   machineMaster.route("/deleteMachine/:machineId").delete(function (req, res, next) {
    machineMasterCtrl.deleteMachineMaster(req, res, next);
  });

  //pagination
  machineMaster.route("/paginationMachine").get(function(req,res,next){
    // console.log("innn");
    machineMasterCtrl.pagination(req,res,next);
});



module.exports = machineMaster;