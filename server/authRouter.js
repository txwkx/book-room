module.exports = function(app, passport) {

  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {

      if (err) return next(err);

      if (!user) return res.send({ success: false, message: info.message });

      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'authentication succeeded' });
      });
    })(req, res, next);
  });


  app.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {

      if (err) return next(err);

      if (!user) return res.send({ success: false, message: info.message });

      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'authentication succeeded' });
      });
    })(req, res, next);
  });


}
