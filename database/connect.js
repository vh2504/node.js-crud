const mongoose = require("mongoose");

module.exports = async function Connect() {
  // await mongoose.connect("mongodb://localhost:2718/EmployeeDB");

  mongoose
    .connect("mongodb://localhost:2718/employees")
    .then(() => console.log("connect mongodb success"));
};
