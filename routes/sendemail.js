/**
 * Created by rizwansyed on 2016-07-30.
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;


router.post('/', function(req,res, next){
    console.log(req.body);
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'hotmail',
        auth: {
            user: 'careappointment@outlook.com', // Your email id
            pass: 'Sail2Sail' // Your password
        }
    }));

    var mailOptions = {
        from: 'Rizwan Hussain <careappointment@outlook.com>', // sender address
        to: req.body.provideremail, // list of receivers
        subject: 'Appointment Request', // Subject line
        //text: text //, // plaintext body
        html: '<p>Hi, You have a new appointment request. Details as follows </p>' +
        '<ul>' +
        '<li>First Name: '+ req.body.firstname +'</li>' +
            '<li>Last Name: '+ req.body.lastname +'</li>' +
        '<li>Email: '+req.body.email+'</li>' +
        '<li>Phone: '+req.body.phone+'</li>' +
        '<li>Phone: '+req.body.address+'</li>' +
        '<li>Notes: '+req.body.notes+'</li>' +
        '<li>Slot 1: '+req.body.slot1+'</li>' +
        '<li>Slot 2: '+req.body.slot2+'</li>' +
        '<li>Slot 3: '+req.body.slot3+'</li>' +
        '</ul>' +
        '<p>Please respond at your earliest convenience.' +
        'Thank You</p>'
    };

    // Connection URL. This is where your mongodb server is running.
    var url = require('../app').locals.dbURL;
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // do some work here with the database.
            // Get the documents collection
            var collection = db.collection('users');

            //Create some users

            var loc = {
                type: "Point",
                coordinates: [Number(req.body.Latitude), Number(req.body.Longitude)]
            };

            var user1 = {
                FirstName: req.body.firstname,
                LastName: req.body.lastname,
                Email: req.body.email,
                Phone: req.body.phone,
                Address: req.body.address,
                Location: loc,
                password: 0
            };


            // Insert some users

            collection.insert([user1], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. ' +
                        'The documents inserted with "_id" are:', result.length, result);
                    res.render('confirmation', {
                        elements: JSON.stringify(req.body),
                        cusID: result["ops"][0]["_id"]
                    });
                }
            });
        }
    });



    transporter.sendMail(mailOptions, function(error, info){
        if (!error) {
            console.log('Message sent: ' + info.response);
            //res.render('confirmation');
            //res.json({Success: info.response});
        } else {
            console.log(error);
            //res.json({Error: 'error'});
        };
    });

});



module.exports = router;

