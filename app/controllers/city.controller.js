const city = require('../models/city.model')
const multer = require("multer");



//show the list of city
const getCityMasters = (req, res, next) => {
    city.find()
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

//show single city
const showCityMasters = (req, res, next) => {
    findquery = {};
    if (req.query.id) {
        findquery['_id'] = req.query.id
    }
    city.findById(findquery)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
}

//add new city

const storeCityMasters = (req, res, next) => {
    let citydata = new city({
        cityId: req.body.cityId,
        city: req.body.city,
        image: req.body.image
    })
    citydata.save()
        .then(response => {
            res.json({
                message: 'city Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error occured'
            })
        })
}

//update a city
const updateCityMasters = (req, res, next) => {
    let cityID = req.body.cityID
    let updatedData = {
        cityId: req.body.cityId,
        city: req.body.city
    }
    city.findByIdAndUpdate(cityID, updatedData)
        .then(() => {
            res.json({
                message: 'city updated successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error occured'
            })
        })
}


const deleteCityMasters = (req, res, next) => {

    city.findByIdAndRemove({ _id: req.params.cityID })
        .then(() => {
            res.json({
                message: 'city deleted successfully'
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
            totalCounts = await city.countDocuments();
            result = await city.find({}).limit(limit).skip(offset);
        }else{
            let counts = await city.aggregate([
                {
                    $addFields: {
                        cityId: { $toString: '$cityId' },
                    },
                },
                {
                    $match: {
                        $or: [
                            { cityId: { '$regex': search.toString(), '$options': 'i' } },
                            { city: { '$regex': search, '$options': 'i' } }
                        ],
                    }
                }
            ])
            totalCounts = counts.length;
            result = await city.aggregate([
                {
                    $addFields: {
                        cityId: { $toString: '$cityId' },
                    },
                },
                {
                    $match: {
                        $or: [
                            { cityId: { '$regex': search.toString(), '$options': 'i' } },
                            { city: { '$regex': search, '$options': 'i' } },
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
    getCityMasters, showCityMasters, storeCityMasters, updateCityMasters, deleteCityMasters,pagination
}