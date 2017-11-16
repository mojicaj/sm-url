'use strict'

//const mongodb = require('mongodb');
//const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.PORT+"/"+process.env.DB;


let short = function short(url) {
  console.log(url[0]);
  //connect()
  let origUrl = url[0];
  //let count = ((localStorage.getItem('URL_count') != null) ? JSON.parse(localStorage.getItem('URL_count')) : 0)+1
  let newUrl = 'https://sm-url.glitch.me/'+'1';
  //let urls = JSON.parse(localStorage.getItem('URLs')) || []
  
  //urls.push({ "original_url":origUrl, "short_url":newUrl })
  
  return { "original_url":origUrl, "short_url":newUrl };
}

/*function connect() {

  mongodb.MongoClient.connect(uri, function(err, db) {
  if(err) throw err;
  
  let urls = db.collection('urls');
  console.log(urls.length);
  db.close;
  });
  
}*/

module.exports = short;