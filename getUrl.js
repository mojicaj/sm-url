'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;

module.exports = function (id){
  return new Promise( function (resolve,reject) {
    
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      let urls = db.collection('urls');
      
      urls.find({ "short_url": {$eq: 'https://sm-url.glitch.me/'+id}
        }).toArray(function (err, stored) {
          if (err) { throw err }
          
          if (stored[0]) {
            resolve(stored[0].original_url);
          } else {
            reject();
          }
        
        db.close();
        });
      
    });
  });
};