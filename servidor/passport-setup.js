const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {;
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "455903968700-bo2cug7jke03u8qn66poe1453v4ip8sd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://procesos2-ij2yuy7u7a-ew.a.run.app/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
