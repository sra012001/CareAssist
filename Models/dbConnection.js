/**
 * Created by rizwansyed on 2016-08-27.
 */
//require/import the mongodb native drivers.
var mongodb = require('mongodb');
//Use "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/CareDB';
module.exports = {
  connectDB: function (collectionName, condition, crudOp, callback) {
      MongoClient.connect(url, function (err, db) {
          if (!err) {
              // connected
              console.log('Connection established to', url);
              var collection = db.collection(collectionName);

              switch (crudOp) {
                  case 'create':
                      collection.insert(condition, function (error, result) {
                          if (error) {
                              callback (error);
                          } else {
                              callback (result);
                          }
                      });
                      break;

                  case 'read' :
                      collection.find(condition, function (error,result) {
                          if (error){
                              callback (error);
                          } else callback (result);
                      });
                      break;

                  case 'update' :
                      collection.update(condition[0], condition[1], function (error,result) {
                          if (error){
                              callback (error);
                          } else callback (result);
                      });
                    break;


                  case 'delete' :
                      break;
              }


          } else {
              callback(err);
          }
      });
  }
};




