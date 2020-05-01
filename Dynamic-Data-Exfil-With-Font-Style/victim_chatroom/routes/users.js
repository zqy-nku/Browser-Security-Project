var express = require('express');
var router = express.Router();



// router.get('/', function (req, res, next) {  
//   res.render('home', { title: 'FSEchatroom' });
// });

// router.post('/', function (req, res) {
//   var Message = global.dbhandle.getModel('message');
//   Message.create({
//     name: req.body.username,
//     content: req.body.content,
//     time:req.body.time
//   }, function (err) {
//     if (err) {
//       res.sendStatus(500);
//       console.log(err);
//     } else {
//       console.log("home post success");
//       res.sendStatus(200);
//     }
//   });

// });



module.exports = router;
