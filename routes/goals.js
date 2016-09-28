/**
 * Created by rizwansyed on 2016-09-09.
 */
var express = require('express');
var router = express.Router();

/* GET goals page. */
router.get('/', function(req, res, next) {
    res.render('goals');
});

module.exports = router;
