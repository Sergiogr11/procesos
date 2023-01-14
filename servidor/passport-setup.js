const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {;
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: env.ID_CLIENTE,
    clientSecret: env.SECRET,
    callbackURL: env.URL_CALLBACK + "/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
