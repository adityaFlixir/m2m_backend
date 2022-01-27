
const roleModel = require("../models/role.model").roleSchema
module.exports = {
    saverolevalue: async (payload) => {
        try{
            let rolePayloadObject = new roleModel(payload);
            let result = await rolePayloadObject.save();
            if(result){
                return {status: false, data: result, message: "ok"};
            }
            return{status: false, data: result, message: "failed to save"};
        } catch(error){
            return{status:false, data: [], message: error.message};
        }
    },

    fetchroleDetails: async (findquery) => {
        try{
            console.log(findquery);
            let result = await roleModel.find(findquery);
            if(result){
                return {status: true, data: result, message: "ok"};
            }
            return {status: false, data: result, message: "failed to get data"};
        } catch(error){
            console.log(error)
            return{
                status: false,
                message:'MongoError: ${error.message}',
            };
        }
    },
};