var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {
    
  app.get('/main', function (req, res) {
      if (req.isAuthenticated()) { 
        res.render('main', { user : req.user,title:"main" });
      }
      else 
        res.redirect('/');  
  });

  app.get('/useradd', function(req, res) {
      if (req.isAuthenticated()) { 
        res.render('register', {});
      }
      else 
      res.redirect('/');  
  });

  app.post('/useradd', function(req, res) {
      if (req.isAuthenticated()) {

        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
              return res.render("register", {info: "Sorry. That username already exists. Try again."});
            }

            passport.authenticate('local')(req, res, function () {
              res.redirect('/');
            });
        });
      }
      else 
        res.redirect('/'); 
  });

  app.get('/', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/', passport.authenticate('local'), function(req, res) {
      res.redirect('/main');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });
};