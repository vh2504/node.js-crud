const studentRouter = require("./student");
const userRouter = require("./user");
require('express-group-routes')

const useApiRoute = (app) => {
  app.group("/api/v1", (router) => {
    router.use("/students", studentRouter);
    router.use("/users", userRouter);
  })
};

module.exports = useApiRoute;
