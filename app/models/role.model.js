const mongooes = require('mongoose')
const Schema   = mongooes.Schema

const roleSchema = new Schema({
    roleId:{
        type: Number,
        required:true,
        unique:true
    },
    role:{
        type: String,
        required:true
    },
    image:{
        type: String
    }
}, {timestamps: true})
 
const Role = mongooes.model('Role',roleSchema)
module.exports= Role
