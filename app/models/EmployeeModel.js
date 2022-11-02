const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const employeeSchema = new Schema(
  {
    _id: ObjectId,
    Employeeid: Number,
    EmployeeName: String,
  }
  // { collection: "Employee" }
);

const Employee = mongoose.model("Employee", employeeSchema, "Employee");
module.exports = Employee;
