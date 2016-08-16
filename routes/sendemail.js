/**
 * Created by rizwansyed on 2016-07-30.
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
        '<li>Notes: '+req.body.notes+'</li>' +
        '<li>Slot 1: '+req.body.slot1+'</li>' +
        '<li>Slot 2: '+req.body.slot2+'</li>' +
        '<li>Slot 3: '+req.body.slot3+'</li>' +
        '</ul>' +
        '<p>Please respond at your earliest convenience.' +
        'Thank You</p>'
    };

    res.render('confirmation', {
        elements: JSON.stringify(req.body)
    });

    /*transporter.sendMail(mailOptions, function(error, info){
        if (!error) {
            console.log('Message sent: ' + info.response);
            res.render('confirmation');
            //res.json({Success: info.response});
        } else {
            console.log(error);
            //res.json({Error: 'error'});
        };
    });*/
});





module.exports = router;

