
var express = require("express");
var bodyParser = require("body-parser");
var machine = express.Router();
var middleware = require("../routes/app.routes");
machine.use(bodyParser.json());
const MachineMaster = require('../models/machineMaster.model')
const app = express();
const mongoose = require('mongoose');
const multer = require("multer");



//feteching data useing get request

const getMachineMasters = (req,res,next)=>{
    MachineMaster.find()
  .then(response =>{
    res.json({
      response
    })
  })
  .catch(error=>{
    res.json({
      message: 'an error occured'
    })
  })
}
  
//fetching data using machineId
const getMachineMaster = (req,res,next)=>{
  MachineMaster.findById({_id:req.params.machineId})
  .then(response =>{
    res.json({
      machines:response
    })
  })
  .catch(error =>{
    res.json({
      message: 'an error occured'
    })
    
  })
}

//adding machine data in database
const addMachineMaster = (req,res,next)=>{
 
  let machineMaster = new MachineMaster({
    model:req.body.model,
    serial:req.body.serial,
    location:req.body.location,
    relatedline:req.body.relatedline,
    machineImage:req.body.machineImage,
    image: req.body.image
  })
  machineMaster.save()
  .then(response =>{
    res.json({
      message : "machine added successfully"
    })
  })
  .catch(error =>{
    res.json({
      message: "an error occured"
    })
  })
}

//update user using user id
const updateMachineMaster= (req,res,next) =>{
  
 console.log("body",req.body);
  let machineId = mongoose.Types.ObjectId(req.body.MId);

  
  MachineMaster.findByIdAndUpdate({_id:machineId},req.body)
  .then(()=>{
    // console.log(res);
    res.json({
      message : 'machine updated successfully'
    })
  })
  .catch(error =>{
    
    res.json({
      message : error

    })
  })
}

//delete user using userId
const deleteMachineMaster = (req,res,next)=>{
  // let userId= req.body.userId;
  MachineMaster.findByIdAndRemove({_id: req.params.machineId})
  .then(()=>{
    res.json({
      message: 'machine deleted successfully'
    })
  })
  .catch(error=>{
    res.json({
      message: 'an error occured'
    })
  })
}

const pagination = async (req, res) => {

  try {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.size);
      let search = req.query.search;
      const offset = limit * (page - 1);
      let result;
      let totalCounts;
      if (req.query.search == '' || req.query.search == 'undefined' || req.query.search == undefined) {
          totalCounts = await MachineMaster.countDocuments();
          result = await MachineMaster.find({}).limit(limit).skip(offset);
      }else{
          let counts = await MachineMaster.aggregate([
              {
                  $match: {
                      $or: [
                        
                          { model: { '$regex': search, '$options': 'i' } },
                          { serial: { '$regex': search, '$options': 'i' } },
                          { location: { '$regex': search, '$options': 'i' } },
                          { relatedline:{ '$regex': search, '$options': 'i' } }
                      ],
                  }
              }
          ])
          totalCounts = counts.length;
          result = await MachineMaster.aggregate([
              // {
              //     $addFields: {
              //         cityId: { $toString: '$cityId' },
              //     },
              // },
              {
                  $match: {
                      $or: [
                        
                          { model: { '$regex': search, '$options': 'i' } },
                          { serial: { '$regex': search, '$options': 'i' } },
                          { location: { '$regex': search, '$options': 'i' } },
                          { relatedline:{'$regex': search, '$options': 'i' }}
                      ],
                  }
              }
          ]).limit(limit).skip(offset);
      }
      res.status(200).send({
          status: true,
          message: "fetched successfully",
          data: {
              "totalItems": totalCounts,
              "totalPages": Math.ceil(totalCounts / limit),
              "pageNumber": page,
              "pageSize": result.length,
              "data": result
          }
      });
  } catch (err) {
      res.status(500).send({
          status: false,
          message: err.message,
          data: []
     });
  }
}

module.exports = {
    getMachineMasters, getMachineMaster , addMachineMaster, updateMachineMaster, deleteMachineMaster, pagination
}