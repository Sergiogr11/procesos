const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  //console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //User.findById(id, function(err, user) {
    done(null, user);
  //});
});

passport.use(new GoogleStrategy({
    clientID:"455903968700-bo2cug7jke03u8qn66poe1453v4ip8sd.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(null, profile);
    //});
  }
));
