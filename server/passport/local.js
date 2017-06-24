const  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const User      = require('../models/userModel');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
      console.log('--- strategy --- serialize ---');
      done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
      console.log('--- strategy --- deserialize ---');
       User.findById(id, (err, user) => {
           done(err, user);
       });
   });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, username, password, done) => {

    User.findOne({ 'username': username }, (err, user) => {
      if (err) return done(err);

      if (user) {
        return done(null, false, {message: 'That username is already taken'});

      } else {

        const userData = {
          username: username,
          password: password
        }

        const newUser = new User(userData);

        newUser.save(err => {
          if (err) return done(err);
          return done(null, newUser);
        });

      }
    });
  }));

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
