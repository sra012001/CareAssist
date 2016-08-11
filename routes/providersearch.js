/**
 * Created by rizwansyed on 2016-07-13.
 */
var express = require('express');
var router = express.Router();

/* GET search provider page. */
router.get('/', function (req, res, next) {
    res.render('providersearch', {
        searchresults: 0
    });

});

module.exports = router;
