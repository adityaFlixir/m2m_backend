const country = require('../models/country.model')
const multer = require("multer");


//show the list of country
const getCountryMasters =(req,res,next) => {
    country.find()
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

//show single country
const showCountryMasters = (req, res, next) => {
    findquery = {};
    if (req.query.id) {
        findquery['_id'] = req.query.id
    }
    country.findById(findquery)
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


//add new country

const storeCountryMasters = (req, res, next) => {
    console.log("res", req.body);
    let countrydata = new country({
        countryId: req.body.countryId,
        country: req.body.country,
        image: req.body.image
    })
    countrydata.save()
    .then(response => {
        res.json({
            message: 'country Added Successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: error
        })
    })
}



//update a country
const updateCountryMasters =(req, res, next) => {
    let countryID = req.body.countryID
    let updatedData = {
        countryId: req.body.countryId,
        country: req.body.country
    }
    country.findByIdAndUpdate(countryID, updatedData)
    .then(() =>{
        res.json({
            message: 'country updated successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occured'
        })
    })
}

const deleteCountryMasters = (req, res, next) => {
    country.findByIdAndRemove({ _id: req.params.countryID })
        .then(() => {
            res.json({
                message: 'country deleted successfully'
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
            totalCounts = await country.countDocuments();
            result = await country.find({}).limit(limit).skip(offset);
        }else{
            let counts = await country.aggregate([
                {
                    $addFields: {
                        countryId: { $toString: '$countryId' },
                    },
                },
                {
                    $match: {
                        $or: [
                            { countryId: { '$regex': search.toString(), '$options': 'i' } },
                            { country: { '$regex': search, '$options': 'i' } }
                        ],
                    }
                }
            ])
            totalCounts = counts.length;
            result = await country.aggregate([
                {
                    $addFields: {
                        countryId: { $toString: '$countryId' },
                    },
                },
                {
                    $match: {
                        $or: [
                            { countryId: { '$regex': search.toString(), '$options': 'i' } },
                            { country: { '$regex': search, '$options': 'i' } },
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
    getCountryMasters, showCountryMasters, storeCountryMasters, updateCountryMasters, deleteCountryMasters,pagination
}