const express = require('express')
//const router  = express.Router()
const roleMasterCtrl = require('../controllers/role.controller');
var roleMaster = express.Router();
var bodyParser = require("body-parser");
roleMaster.use(bodyParser.json());



//get all role data
roleMaster.route("/getRoles").get(function (req,res,next){
    roleMasterCtrl.getRoleMasters(req,res,next);
});

//get one role using roleID
roleMaster.route("/getRole/:roleID").get(function(req,res,next){
    roleMasterCtrl.getRoleMaster(req,res,next);
});
//adding new role
roleMaster.route("/addRole").post(function(req,res,next){
    roleMasterCtrl.addRoleMaster(req,res,next);
});

//update using roleID
roleMaster.route("/updateRole").put(function(req,res,next){
roleMasterCtrl.updateRoleMaster(req,res,next);
});


//delet role using roleID
roleMaster.route("/deleteRole/:roleID").delete(function(req,res,next){
    roleMasterCtrl.deleteRoleMaster(req,res,next);
});

roleMaster.route("/paginationRole").get(function(req,res,next){
    console.log("innn");
    roleMasterCtrl.pagination(req,res,next);
});

//router.get('/', rolecontroller.index)
//router.post('/show', rolecontroller.show)
//router.post('/store', rolecontroller.store)
//router.post('/update', rolecontroller.update)
//router.post('/delete', rolecontroller.destroy)


module.exports = roleMaster