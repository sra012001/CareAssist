var express = require('express');
var router = express.Router();
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

router.post('/', function(req, res) {
    console.log(req.body);
    insideDb(req);
    res.send("ho ho ho ");
    //res.render('provider');
});

module.exports = router;

function insideDb(req){
    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/CareDB';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // do some work here with the database.
            // Get the documents collection
            var collection = db.collection('BusinessDetails');

            //Create some users

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

            var user1 = {
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

           
            // Insert some users

            collection.insert([user1], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "BusinessDetails" collection. The documents inserted with "_id" are:', result.length, result);
                }
            });


            collection.find(
                {
                    location : {
                        $near : {
                            $geometry : {
                                type : "Point" ,
                                coordinates : [Number(req.body.usrLatitude), Number(req.body.usrLongitude)]
                            },
                            $maxDistance : 5000
                        }
                    }
                },
                {
                    businessname : 1,
                    address : 1,
                    _id : 0
                }
            ).toArray(function(err,docs){
                console.log('Search Results: ', docs);
            });

            //Close connection
            // db.close();
        }
    });

}


