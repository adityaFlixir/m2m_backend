const adminModel = require("../models/admin.model").adminSchema

module.exports = {
  saveAdminValue: async (payload) => {
    try {
      let adminPayloadObject = new adminModel(payload);
      let result = await adminPayloadObject.save();
      if (result) {
        return { status: true, data: result, message: "ok" };
      }
      return { status: false, data: result, message: "faild to save" };
    } catch (error) {
      return { status: false, data: [], message: error.message };
    }
  },

  fetchAdminDetails: async (findquery) => {
    try {
      console.log(findquery);
      let result = await adminModel.find(findquery);
      if (result) {
        return { status: true, data: result, message: "ok" };
      }
      return { status: false, data: result, message: "faild to get result" };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },
};
