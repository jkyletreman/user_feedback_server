const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoURI, cookieKey } = require("./config/keys")
require("./models/Users");
require('./services/passport');

mongoose.connect(mongoURI)

const app = express();

app.use(
  // maxAge property needs to be in miliseconds, so 30 days =
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
)

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Ready to serve..."));
