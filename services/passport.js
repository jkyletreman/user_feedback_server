const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const { googleClientID, googleClientSecret } = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // mongoose query
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // profile id comes from google findOne mogoose query
      const existingUser = await User.findOne({ googleID: profile.id });
      // do we have a user?
      if (existingUser) {
        return done(null, existingUser);
      }
      // create a new one
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
