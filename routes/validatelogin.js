/**
 * Created by rizwansyed on 2016-08-26.
 */
var express = require('express');
var router = express.Router();
var user = require('../Models/user');
var db = require('../Models/dbConnection');
var newuser = new user();
var app = express();
router.post ('/', function (req,res, next) {
    var query = {
        Email: req.body.email
    };
    db.connectDB('users',query, 'read', function (results) {
          results.toArray(function (err, docs) {
              if (docs.length > 0){
                  docs.forEach(function (myDoc) {
                      if (newuser.validPassword(myDoc.password, req.body.password)){
                          res.render('/index', {isAuthenticated: true});
                      }
                      else res.render('login', {isAuthenticated: false});
                  });
              }
              else console.log('No Results Found');
           });
    });

    //app.use()
    
});

module.exports = router;