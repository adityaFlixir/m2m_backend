var express = require("express");
var router = express.Router();

router.get("/api", function (req, res, next) {
  // var fs = require('fs');
  // var viewOptions = {
  //     'title': "Profile creation model",
  //     'description': "Home page.",
  //     'datasrc': './swagger/json/source.json'
  // };
  // var inputfile = './swaggerAPI/peofileCreation.yaml';
  // var outputfile = './public/swagger/json/source.json';
  // var yaml = require('js-yaml');
  // /** yaml to json */
  // var swaggerJson = yaml.load(fs.readFileSync(inputfile, { encoding: 'utf-8' }));
  // fs.writeFileSync(outputfile, JSON.stringify(swaggerJson), 'utf8');
  // res.render('swagger', viewOptions);
});

module.exports = router;
