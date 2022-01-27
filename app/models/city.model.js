const mongooes = require('mongoose')
const Schema   = mongooes.Schema

const citySchema = new Schema({ 
    cityId:{
        type: Number, required:true, unique:true
    },
    city:{
        type: String, required:true, unique:true, 
    },
    image:{
        type: String
    }
}, {timestamps: true})

const city = mongooes.model('city',citySchema)
module.exports= city