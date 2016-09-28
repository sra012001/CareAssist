/**
 * Created by rizwansyed on 2016-08-26.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

module.exports = router;
