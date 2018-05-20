const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const { googleClientID, googleClientSecret } = require("../config/keys");

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  // mongoose query
  User.findById(id).then(user => {
    done(null, user)
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // profile id comes from google findOne mogoose query
      User.findOne({ googleID: profile.id })
        .then((existingUser) => {
          // do we have a user?
          if(existingUser) {
            done(null, existingUser);
          } else {
            // create a new one
            new User({ googleID: profile.id })
              .save()
              .then(user => done(null, user));
          };;
        })
    }
  )
);
