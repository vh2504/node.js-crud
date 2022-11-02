const studentRouter = require("./student");
const userRouter = require("./user");

const useApiRoute = (app) => {
  app.use("/api/students", studentRouter);
  app.use("/api/users", userRouter);
  
  app.use("/api/test", (req, res) => {
    console.log("test");
    res.status(200).json([]);
  })
};

module.exports = useApiRoute;
