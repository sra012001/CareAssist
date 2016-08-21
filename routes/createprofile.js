/**
 * Created by rizwansyed on 2016-08-16.
 */
var express = require('express');
var router = express.Router();
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var user = require('../Models/user');
var newuser = new user();
router.post('/', function(req, res) {
    //console.log(req.body)
    //console.log();
    // Connection URL. This is where your mongodb server is running.
    var url = require('../app').locals.dbURL;
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');
            var ObjectID = require('mongodb').ObjectID;


            // Update users

            collection.updateOne({"_id": ObjectID(req.body.cusid)},
                {$set: {"password": newuser.generateHash(req.body.password)}},
                function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Updated %d documents into the "users" collection. The documents updated with "_id" are:', result.length, result);
                    }
                });
        }
    });

    res.send("Saved Successfully");
    //res.render('provider');
});

module.exports = router;

