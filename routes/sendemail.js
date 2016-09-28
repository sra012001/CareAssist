/**
 * Created by rizwansyed on 2016-07-30.
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var db = require('../Models/dbConnection');

router.post('/', function(req,res){
    //Send Email
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
        '<li>Address: '+req.body.address+'</li>' +
        '<li>Notes: '+req.body.notes+'</li>' +
        '<li>Slot 1: '+req.body.slot1+'</li>' +
        '<li>Slot 2: '+req.body.slot2+'</li>' +
        '<li>Slot 3: '+req.body.slot3+'</li>' +
        '</ul>' +
        '<p>Please respond at your earliest convenience.' +
        'Thank You</p>'
    };
    //Mail enabled
    transporter.sendMail(mailOptions, function(error, info){
        if (!error) {
            console.log('Message sent: ' + info.response);

        } else {
            console.log(error);

        };
    });

    var loc = {
        type: "Point",
        coordinates: [Number(req.body.Latitude), Number(req.body.Longitude)]
    };

    var appointment = {
        ProfileID: 0,
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Email: req.body.email,
        Phone: req.body.phone,
        Address: req.body.address,
        Location: loc,
        timestamp: new Date()
    };

    db.connectDB('transaction',appointment, 'create', function (results) {
        if (results){
            console.log('trans id',results["ops"][0]["_id"]);
            res.render('confirmation',{
                elements: appointment,
                transID: results["ops"][0]["_id"]
            });
        }
        else res.send(results);

    });

});

module.exports = router;

