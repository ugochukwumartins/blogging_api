const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const { connectToDb } = require("./db");

const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./services/auth_with_jwt");
const onboardingRoute = require("./routes/onboarding");
const blogRoute = require("./routes/blogging");
const httpreq = require("./routes/request");
const PORT = process.env.PORT;
let User;
const app = express();
app.set("view engine", "ejs");

app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(onboardingRoute);
app.use(blogRoute);
app.use(httpreq);

connectToDb();

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;
