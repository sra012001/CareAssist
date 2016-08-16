/**
 * Created by rizwansyed on 2016-08-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('team');
});

module.exports = router;
