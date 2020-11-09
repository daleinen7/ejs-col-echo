const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsCtrl = require('../controllers/posts');

/* GET home page. */
router.get('/', postsCtrl.allPosts);

// login
router.get('/auth/google', passport.authenticate(
  'google', 
  {scope:['profile', 'email']}
  ))

// callback route
router.get('/oauth2callback', passport.authenticate(
  'google', 
  {
    successRedirect:'/',
    failureRedirect:'/'
  }
))

// logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
