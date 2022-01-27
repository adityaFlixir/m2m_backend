const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let adminCore = require("./core");
const collection = "admin";

const adminSchema = mongoose.Schema({
  id: { type: Number,unique: true },
  adminName : {type: String},
  username:{type: String},
  password:{type: String},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

adminCore.addIncrement(collection, adminSchema, "id", 001, 1, true);

module.exports = {
  adminSchema: mongoose.model("adminModel", adminSchema, "admin"),
};
