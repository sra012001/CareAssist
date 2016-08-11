var express = require('express');
var router = express.Router();

/* GET provider page. */
router.get('/', function(req, res, next) {
    res.render('provider');

});

module.exports = router;
