var indexRouter = require("./home");
var usersRouter = require("./users");
var testRouter = require("./test");

const useWebRoute = (app) => {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/test", testRouter);
};

module.exports = useWebRoute;
