const express = require("express");
const mongoose = require('mongoose');
const { mongoURI } = require("./config/keys")
require('./services/passport');

mongoose.connect(mongoURI)

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Ready to serve..."));
