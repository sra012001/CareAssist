/**
 * Created by rizwansyed on 2016-07-11.
 */
var express = require('express');
var router = express.Router();
var db = require('../Models/dbConnection');
var searchresults = "";
router.post('/', function (req, res) {
    var query = {
        $and: [
            {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(req.body.usrLatitude), Number(req.body.usrLongitude)]
                        },
                        $maxDistance: 15000
                    }
                }},
            {
                $or:
                    [{
                        'servicerates.Cooking': {$lte: parseInt(req.body.hourlyrate)}},
                        {'servicerates.Meals': {$lte: parseInt(req.body.hourlyrate)}},
                        {'servicerates.Transport': {$lte: parseInt(req.body.hourlyrate)}},
                        {'servicerates.HomeMaint': {$lte: parseInt(req.body.hourlyrate)}},
                        {'servicerates.PersonalHyg': {$lte: parseInt(req.body.hourlyrate)}
                        }]
            }]
    };

    db.connectDB('BusinessDetails',query, 'read', function (results) {
        results.toArray(function (err, docs) {
            if (docs.length > 0){
                    res.render('providersearch',{
                        searchresults: docs
                    });
            }
            else {
                res.render('providersearch', {
                    searchresults: 0
                });
            }
        });
    });
});

module.exports = router;

