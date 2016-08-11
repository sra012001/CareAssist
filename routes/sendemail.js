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
            user: 'a.syedrizwan@outlook.com', // Your email id
            pass: 'deClub60' // Your password
        }
    }));



    var mailOptions = {
        from: 'Rizwan Hussain <a.syedrizwan@outlook.com>', // sender address
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

    transporter.sendMail(mailOptions, function(error, info){
        if (!error) {
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        } else {
            console.log(error);
            res.json({yo: 'error'});
        };
    });
});





module.exports = router;
