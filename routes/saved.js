/**
 * Created by rizwansyed on 2016-09-13.
 */
var express = require('express');
var router = express.Router();
var db = require('../Models/dbConnection');

router.post('/', function(req, res) {
    var address = {
        Street_Number: req.body.street_number,
        Street_Name: req.body.street_name,
        City: req.body.City,
        Province: req.body.Province,
        PostalCode: req.body.postal_code,
        Country: req.body.country
    };

    var loc = {
        type: "Point",
        coordinates: [Number(req.body.Latitude), Number(req.body.Longitude)]
    };

    if (req.body.cook == null) {
        req.body.cook = 0;
    } else if(typeof req.body.cook == "string"){
        req.body.cook = parseInt(req.body.cook);
    }

    if (req.body.meals == null){
        req.body.meals = 0;
    } else if(typeof req.body.meals == "string"){
        req.body.meals = parseInt(req.body.meals);
    }

    if (req.body.transp == null){
        req.body.transp = 0;
    } else if(typeof req.body.transp == "string"){
        req.body.transp = parseInt(req.body.transp);
    }
    if (req.body.hm == null){
        req.body.hm = 0;
    } else if(typeof req.body.hm == "string"){
        req.body.hm = parseInt(req.body.hm);
    }
    if (req.body.ph == null){
        req.body.ph = 0;
    } else if(typeof req.body.ph == "string"){
        req.body.ph = parseInt(req.body.ph);
    }

    var rates = {
        Cooking: req.body.cook,
        Meals: req.body.meals,
        Transport: req.body.transp,
        HomeMaint: req.body.hm,
        PersonalHyg: req.body.ph
    };

    var wkhours = {
        Opens: req.body.wdsthours,
        Closes: req.body.wdenhours
    };

    var wehours = {
        Opens: req.body.westhours,
        Closes: req.body.weenhours
    };

    var provider = {
        businessname: req.body.name,
        businessdesc: req.body.desc,
        email: req.body.email,
        phone: req.body.phone,
        address: address,
        location: loc,
        servicerates: rates,
        Weekdayhours: wkhours,
        Weekendhours: wehours
    };

    db.connectDB('BusinessDetails',provider, 'create', function (results) {

        if (results){
            res.redirect('/team')
            //res.send("Saved Successfully");
        }
        else res.send(results);

    });
});

module.exports = router;

