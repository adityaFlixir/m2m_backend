const express = require('express')
const countryMaster  = express.Router()
const countrycontroller = require('../controllers/country.controller')
var bodyParser = require("body-parser");
countryMaster.use(bodyParser.json());

countryMaster.route("/getcountry").get(function (req, res, next) {
    countrycontroller.getCountryMasters(req, res, next);
  });

countryMaster.route("/showcountry").get(function (req, res, next) {
    countrycontroller.showCountryMasters(req, res, next);
  });

countryMaster.route("/storecountry").post(function (req, res, next) {
    countrycontroller.storeCountryMasters(req, res, next);
  });

countryMaster.route("/updatecountry").put(function (req, res, next) {
    countrycontroller.updateCountryMasters(req, res, next);
  });

countryMaster.route("/deletecountry/:countryID").delete(function (req, res, next) {
    countrycontroller.deleteCountryMasters(req, res, next);
  });

  countryMaster.route("/paginationcountry").get(function(req,res,next){
    console.log("innn");
    countrycontroller.pagination(req,res,next);
});

// router.get('/', rolecontroller.index)
// router.post('/show', citycontroller.show)
// router.post('/store', citycontroller.store)
// router.post('/update', citycontroller.update)
// router.post('/delete', citycontroller.destroy)
module.exports = countryMaster