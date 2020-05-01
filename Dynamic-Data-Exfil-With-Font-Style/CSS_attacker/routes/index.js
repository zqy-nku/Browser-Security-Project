var express = require('express');
var router = express.Router();
var fs= require("fs");
var url = require("url");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/font', function(req, res, next) {
  res.render('fontstyle', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
  var ret ="";
  fs.readFile('test.txt','UTF-8' ,function (err, data) {
    if (err) throw err;
    ret = data;
    // console.log("return: "+ret);
    res.send(ret);
  });
});


router.get('/log',function(req, res, next){
  var ret ="";
  let query = url.parse(req.url,true).query;
  let message = query.message;
  console.log(message);
  fs.appendFile('test.txt',message, function (err) {
    if (err) throw err;
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
