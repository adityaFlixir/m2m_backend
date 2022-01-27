var express = require("express");
var bodyParser = require("body-parser");
var role = express.Router();
const RoleMaster = require('../models/role.model');
var middleware = require("../routes/app.routes");
role.use(bodyParser.json());
const app = express();
const mongoose = require('mongoose');
const multer = require("multer");



//fetching data using get request
const getRoleMasters =(req,res,next) => {
    RoleMaster.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

//fetching data using roleid
const getRoleMaster = (req, res, next) =>{
    //let roleID = req.body.roleID
    RoleMaster.findById({_id:req.params.roleID})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//add new role

const addRoleMaster = (req, res, next) => {
    let roleMaster = new RoleMaster({
        roleId: req.body.roleId,
        role: req.body.role,
        image: req.body.image
    })
    roleMaster.save()
    .then(response => {
        res.json({
            message: 'Role Added Successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occured'
        })
    })
}

//update a role
const updateRoleMaster =(req, res, next) => {
let roleID = req.body.roleID

   let updatedData = {       roleId: req.body.roleId,
        role: req.body.role
    }

    RoleMaster.findByIdAndUpdate(roleID, {$set: updatedData})
    .then(() =>{
        res.json({
            message: 'roles updated successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occured'
        })
    })
}






//delete the role

const deleteRoleMaster = (req, res, next) => {
    //let roleID = req.body.roleID
    RoleMaster.findByIdAndRemove({_id:req.params.roleID})
    .then(() => {
        res.json({
            message: 'role deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error Occured!'
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
            totalCounts = await RoleMaster.countDocuments();
            result = await RoleMaster.find({}).limit(limit).skip(offset);
        }else{
            let counts = await RoleMaster.aggregate([
                {
                    $addFields: {
                        roleId: { $toString: '$roleId' },
                    },
                },
                {
                    $match: {
                        $or: [
                            { roleId: { '$regex': search.toString(), '$options': 'i' } },
                            { role: { '$regex': search, '$options': 'i' } }
                        ],
                    }
                }
            ])
            totalCounts = counts.length;
            result = await RoleMaster.aggregate([
                {
                    $addFields: {
                        roleId: { $toString: '$roleId' },
                    },
                },
                {
                    $match: {
                        $or: [
                            { roleId: { '$regex': search.toString(), '$options': 'i' } },
                            { role: { '$regex': search, '$options': 'i' } },
                        ],
                    }
                }
            ]).limit(limit).skip(offset);
        }
        res.status(200).send({
            status: true,
            message: "fetched successgully",
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
    getRoleMasters, getRoleMaster, addRoleMaster, updateRoleMaster, deleteRoleMaster,pagination
}