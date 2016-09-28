/**
 * Created by rizwansyed on 2016-08-16.
 */
var express = require('express');
var router = express.Router();
var user = require('../Models/user');
var db = require('../Models/dbConnection');
var newuser = new user();
router.post('/', function(req, res) {


    req.body.password = newuser.generateHash(req.body.password);
    req.body.confpass = newuser.generateHash(req.body.confpass);
    db.connectDB('users',req.body, 'create', function (results) {
    
        if (results){
            var ObjectId = require('mongodb').ObjectId;
            var query = new Array(2);
            query[0] = {
                _id : ObjectId(req.body.transID)
            };
            query[1] = {
                $set: {
                    ProfileID: ObjectId(results["ops"][0]["_id"])
                }
            };

            db.connectDB('transaction',query,'update',function (result) {
                if(result){
                    res.send('success');
                }
                
            })


        }
        else res.send(results);

    });
    
});

module.exports = router;

