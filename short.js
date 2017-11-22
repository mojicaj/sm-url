'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;

let short = function short(url) {

  let origUrl = url[0];
  
  return new Promise(function (resolve, reject) {
    
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      let urls = db.collection('urls');
      let newUrl;
      
      urls.count().then( (cnt) => {
        let count = cnt+1;
        newUrl = { "original_url":origUrl, "short_url":'https://sm-url.glitch.me/'+count};
        
      });
      
      urls.find({ "original_url": { $eq: origUrl }}, {_id: 0}).toArray(function (err, stored) {
        if (err) { throw err }
        
        if (!stored[0] || stored[0].original_url !== origUrl ) {
          
          urls.insert(newUrl, function (err, data) {
            if (err) { throw err }
          });
          resolve({ "original_url":newUrl.original_url, "short_url":newUrl.short_url });
          
        } else {
          resolve(stored[0]);  
        }
        db.close();  
      });
    });
  });
}

module.exports = short;