const  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const User      = require('../models/userModel');

module.exports = (passport) => {
  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  (req, username, password, done) => {

    User.findOne({ 'username' :  username }, (err, user) => {

      if (err) return done(err);

      if (!user){
        return done(null, false, {message: 'User not found'});
      }

      if (!user.validPassword(password)){
        return done(null, false, {message: 'Oops! Wrong password'});
      }

      return done(null, user);

    });
  }));
}
