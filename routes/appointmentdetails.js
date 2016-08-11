/**
 * Created by rizwansyed on 2016-07-30.
 */

var express = require('express');
var router = express.Router();

router.post('/', function (req,res) {
    console.log('request details:' ,req.body);
   res.render('appointmentdetails', {
       provideremail: req.body.provideremail
   });
});

module.exports = router;