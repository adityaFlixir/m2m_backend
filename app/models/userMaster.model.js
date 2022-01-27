const mongoose = require("mongoose");
let Schema = mongoose.Schema;


const userMasterSchema =  new Schema({
    // userId: { type: Number },
    
    firstName : {type: String ,required:true},
    lastName:{type: String,required:true},
    userEmail:{type: String,required:true},
    userMobile:{type: String,required:true},
    image:{ type: String}
   
  },{timestamps:true});

  const UserMaster = mongoose.model('UserMaster',userMasterSchema);
  module.exports = UserMaster;

 