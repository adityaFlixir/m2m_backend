const mongooes = require('mongoose')
const Schema   = mongooes.Schema

const countrySchema = new Schema({
    countryId:{
        type: Number,required:true, unique:true
    },
    country:{
        type: String,required:true, unique:true
    },
    image:{
        type: String
    }

}, {timestamps: true})

const country = mongooes.model('country',countrySchema)
module.exports= country