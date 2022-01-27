const express = require('express')
const cityMaster  = express.Router()
const citycontroller = require('../controllers/city.controller')
var bodyParser = require("body-parser");
cityMaster.use(bodyParser.json());

cityMaster.route("/getcity").get(function (req, res, next) {
    citycontroller.getCityMasters(req, res, next);
  });

cityMaster.route("/showcity").get(function (req, res, next) {
    citycontroller.showCityMasters(req, res, next);
  });

cityMaster.route("/storecity").post(function (req, res, next) {
    citycontroller.storeCityMasters(req, res, next);
  });

cityMaster.route("/updatecity").put(function (req, res, next) {
    citycontroller.updateCityMasters(req, res, next);
  });

  cityMaster.route("/deletecity/:cityID").delete(function(req,res,next){
    citycontroller.deleteCityMasters(req,res,next);

});

cityMaster.route("/paginationcity").get(function(req,res,next){
  console.log("innn");
 citycontroller.pagination(req,res,next);
});

module.exports = cityMaster