
var express = require("express");
var bodyParser = require("body-parser");
var user = express.Router();
var middleware = require("../routes/app.routes");
user.use(bodyParser.json());
const UserMaster = require('../models/userMaster.model')
const app = express();
const mongoose = require('mongoose');
const multer = require("multer");



//feteching data useing get request

const getUserMasters = (req,res,next)=>{
  UserMaster.find()
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
  
//fetching data using userId
const getUserMaster = (req,res,next)=>{
  // let userId = req.body.userId;
  UserMaster.findById({_id:req.params.userId})
  .then(response =>{
    res.json({
      users:response
    })
  })
  .catch(error =>{
    res.json({
      message: 'an error occured'
    })
    
  })
}

//adding user data in database
const addUserMaster = (req,res,next)=>{
 
  let userMaster = new UserMaster({
    userId:     req.body.userId,
    firstName : req.body.firstName,
    lastName:   req.body.lastName,
    userEmail:  req.body.userEmail,
    userMobile: req.body.userMobile,
    image: req.body.image
  })
  userMaster.save()
  .then(response =>{
    res.json({
      message : "user added successfully"
    })
  })
  .catch(error =>{
    res.json({
      message: "an error occured"
    })
  })
}

//update user using user id
const updateUserMaster= (req,res,next) =>{
  
 console.log(req.body);
  let userId = mongoose.Types.ObjectId(req.body.userId);
  UserMaster.findByIdAndUpdate({_id:userId},req.body)
  .then(()=>{
    // console.log(res);
    res.json({
      message : 'user updated successfully'
    })
  })
  .catch(error =>{
    
    res.json({
      message : error

    })
  })
}

//delete user using userId
const deleteUserMaster = (req,res,next)=>{
  // let userId= req.body.userId;
  UserMaster.findByIdAndRemove({_id: req.params.userId})
  .then(()=>{
    res.json({
      message: 'user deleted successfully'
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
          totalCounts = await UserMaster.countDocuments();
          result = await UserMaster.find({}).limit(limit).skip(offset);
      }else{
          let counts = await UserMaster.aggregate([
              // {
              //     $addFields: {
              //         cityId: { $toString: '$cityId' },
              //     },
              // },
              {
                  $match: {
                      $or: [
                          { firstName: { '$regex': search, '$options': 'i' } },
                          { lastName: { '$regex': search, '$options': 'i' } },
                          { userEmail: { '$regex': search, '$options': 'i' } },
                          { userMobile: { '$regex': search, '$options': 'i' } },
                      ],
                  }
              }
          ])
          totalCounts = counts.length;
          result = await UserMaster.aggregate([
              // {
              //     $addFields: {
              //         cityId: { $toString: '$cityId' },
              //     },
              // },
              {
                  $match: {
                      $or: [
                        { firstName: { '$regex': search, '$options': 'i' } },
                        { lastName: { '$regex': search, '$options': 'i' } },
                        { userEmail: { '$regex': search, '$options': 'i' } },
                        { userMobile: { '$regex': search, '$options': 'i' } },
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
  getUserMasters, getUserMaster , addUserMaster, updateUserMaster, deleteUserMaster,pagination
}