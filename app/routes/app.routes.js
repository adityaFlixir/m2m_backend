var appRouter = new Object();
// const jwtController = require("../controllers/jwt.controller");
// const genericHelper = require("../helpers/generic.helper");
appRouter.initialize = function (app) {

  /*### default route ###*/
  var admin = require("../routes/admin.routes");
  app.use('/api/admin', admin);
  
  var role = require("../routes/role.routes");
  app.use('/api/role', role);
  
  var userMaster = require("../routes/userMaster.route");
  app.use('/api/user', userMaster);

  var countryMaster = require("../routes/country.routes"); 
  app.use('/api/country', countryMaster);
  
  
  var cityMaster = require("../routes/city.routes");
  app.use('/api/city', cityMaster);

  
  var machineMaster= require("../routes/machineMaster.route")
  app.use('/api/machine', machineMaster);


};
module.exports = appRouter;


//module.export= app