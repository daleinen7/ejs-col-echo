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
router.get('/auth/facebook', passport.authenticate(
  'facebook', 
  ))

// callback route
router.get('/oauth2callback', passport.authenticate(
  'google', 
  {
    successRedirect:'/',
    failureRedirect:'/'
  }
))
router.get('/auth/facebook/callback',       
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }))


// logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
