const mongoose = require("mongoose");
let Schema = mongoose.Schema;


const machineMasterSchema =  new Schema({
    
    model:{type: String,required:true , unique:true},
    serial:{type: String,required:true,unique:true},
    location:{type: String,required:true},
    machineImage:{ type: String},
    relatedline:{type: String,required:true , unique:true},
    image:{ type: String}
  },
  {timestamps:true});

  const MachineMaster = mongoose.model('MachineMaster',machineMasterSchema);
  module.exports = MachineMaster;

 