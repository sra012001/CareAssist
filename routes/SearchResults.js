/**
 * Created by rizwansyed on 2016-07-11.
 */
var express = require('express');
var router = express.Router();
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var searchresults = "";
router.post('/', function (req, res) {
    console.log(req.body);
    
    // Connection URL. This is where your mongodb server is running.
    var url = require('../app').locals.dbURL;
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // do some work here with the database.
            // Get the documents collection
            var collection = db.collection('BusinessDetails');

            srchres = collection.find(
                {
                    /*$and: [{*/
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [Number(req.body.usrLatitude), Number(req.body.usrLongitude)]
                            },
                            $maxDistance: 5000
                        }
                    }
                    /*,
                    servicerates: {
                        Cooking: {$lt : parseInt(req.body.hourlyrate)},
                        Meals: {$lt : parseInt(req.body.hourlyrate)},
                        Transport: {$lt : parseInt(req.body.hourlyrate)},
                        HomeMaint: {$lt : parseInt(req.body.hourlyrate)},
                        PersonalHyg: {$lt : parseInt(req.body.hourlyrate)}
                    }*/
                // }]
                }
            );
             srchres.toArray(function (err, docs) {
                 res.render('providersearch',{
                     searchresults: docs
                 });
             console.log('Search Results: ', docs);
             });

           /* srchres.forEach(function (myDoc) {
                    console.log("business name: " + myDoc.businessname);

                }
            );*/

        } else {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
    });



});

module.exports = router;

