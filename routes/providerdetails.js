/**
 * Created by rizwansyed on 2016-07-15.
 */
var express = require('express');
var router = express.Router();
var url = require('url');
/* GET provider details page. */
router.post('/', function (req, res) {
    //var url_parts = url.parse(req.url, true);
    //var query = url_parts.query;

    console.log('URL DETAILS:', req.body);


    res.render('providerdetails', {
        businessname: req.body.bname,
        businessDesc: req.body.bdesc,
        weekdayhours: req.body.bwkhours,
        weekendhours: req.body.bwehours ,
        cooking: req.body.bcooking,
        meals: req.body.bmeals,
        transport: req.body.btransport,
        homemaintenance: req.body.bhomemaint,
        personalhygiene: req.body.bpershyg,
        Address: req.body.baddress,
        Email: req.body.bemail,
        Phone: req.body.bphone

    });

});

module.exports = router;
