var createError = require("http-errors");
var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var hbs = require("hbs");
const session = require('express-session');



var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
// database connect
mongoose
  .connect("mongodb://127.0.0.1:27017/slaywithus", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch(() => {
    console.log("connection fail");
  });

  app.use(
    session({
      secret: 'your-secret-key', // Replace with your own secret key
      resave: false,
      saveUninitialized: false,
      // Additional configuration options as needed
    })
  );
// view engine setup
app.set("views", "views");
app.set("view engine", "hbs");
hbs.registerPartials("views", "views");
app.use("/public", express.static("public"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
module.exports = app;
app.listen(8080, () => {
  console.log("server listin at port 8080");
});
