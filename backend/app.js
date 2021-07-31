const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./strategies/authenticate");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");
const viewRouter = require("./routes/view");
const reportRouter = require("./routes/report");
const categoriesRouter = require("./routes/categories");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  console.log("app.get request called");
  res.sendFile(path.resolve(__dirname, "../build"));
});

app.use(logger("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({ credentials: true }));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/view", viewRouter);
app.use("/report", reportRouter);
app.use("/categories", categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
