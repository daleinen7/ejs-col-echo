const passport = require('passport');
const User = require('../models/user.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// call passport method to plug-in instance of oauth strategy and provide a verify cb whenever a user logs in using oauth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ 'googleId': profile.id }, function (err, user) {
            if (err) return cb(err);
            if (user) {
                return cb(null, user);
            } else {
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                });
                newUser.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                });
            }
        });
    }
));

// serialize will call after verify cb to let passport know what data we want to store in session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserialize will call on each request when user is logged in ---> returning req.user === User model
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});