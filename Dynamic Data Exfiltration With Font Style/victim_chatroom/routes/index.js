var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'FSEchatroom' });
});



router.get('/login', function (req, res) {
  res.render('login', { title: 'User Login' });
});

router.post('/login', function (req, res) {
  var User = global.dbhandle.getModel('user');
  var userpwd = req.body.password;
  var username = req.body.name;
  User.findOne({ name: username }, function (err, doc) {
    if (err) {
      res.sendStatus(500);
      console.log('network error');
    }
    else if (!doc) {
      res.sendStatus(404);
      console.log('user not exist');
    }
    else {
      if (doc.password != userpwd) {
        res.sendStatus(404);
        console.log('wrong password');
      }
      else {
        res.sendStatus(200);
        console.log('user exist');
      }
    }
  });
});


router.get('/register', function (req, res) {
  res.render('register', { title: 'User register' });
})

router.post('/register', function (req, res) {
  var User = global.dbhandle.getModel('user');
  var userpwd = req.body.password;
  var username = req.body.name;
  User.findOne({ name: username }, function (err, doc) {
    if (err) {
      res.sendStatus(500);
      console.log('network error');
    }
    else if (doc) {
      console.log('existed username');
      res.sendStatus(500);
    }
    else {
      User.create({
        name: username,
        password: userpwd
      }, function (err) {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.get('/home', function (req, res, next) {  
  res.render('home', { title: 'FSEchatroom' });
});
router.get('/m', function (req, res, next) {
  res.render('mousetracking', { title: 'FSEchatroom' });
});

router.post('/home', function (req, res) {
  var Message = global.dbhandle.getModel('message');
  Message.create({
    name: req.body.username,
    content: req.body.content,
    time:req.body.time
  }, function (err) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      console.log("home post success");
      res.sendStatus(200);
    }
  });

});

module.exports = router;
