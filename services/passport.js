const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const { googleClientID, googleClientSecret } = require("../config/keys");

const User = mongoose.model('users')

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // profile id comes from google
      User.findOne({ googleID: profile.id })
        .then((existingUser) => {
          if(existingUser) {

          } else {
            new User({ googleID: profile.id }).save();
          }
        })
    }
  )
);
