var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const useWebRoute = require("./routes/web");
const useApiRoute = require("./routes/api");
const authMiddleware = require("./middlewares/AuthMiddleware");
const jwt = require("jsonwebtoken");
const connect = require("./database/connect");
const { generateJWTToken } = require("./services/UserService");
const dotenv = require("dotenv");

console.log(path.parse("./app/controllers/HomeController.js"));
// get config vars
dotenv.config();

var cron = require("node-cron");

// cron.schedule("* * * * *", async () => {
//   console.log("running a task every minute: ", Date());
// });

// cron.schedule("* * * * * *", () => {
//   console.log("running a task every second: ", Date());
// });

// access config var
// console.log("token", process.env.TOKEN_SECRET);

// console.log(require("crypto").randomBytes(64).toString("hex")); // key for jwt

// const employeeModel = require("./app/models/EmployeeModel");
connect();

// console.log(generateJWTToken({ username: "vh254" }));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use("/statics/", express.static(path.join(__dirname, "public")));

// app-level middleware
function check(req, res, next) {
  console.log("user id: ", req.params.userId);
  if (req.params.userId != 7) {
    next("route");
    return;
  }
  next();
}

useWebRoute(app);
useApiRoute(app);

app.use((req, res, next) => {
  if (!req.route && req.path.startsWith("/api/")) {
    res.status(404).json({ code: 404, message: "Route not found" });
  }
  next();
});
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

// start foo bar zoo baz
module.exports = app;
