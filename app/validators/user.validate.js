const { checkSchema } = require("express-validator");

exports.addUserSchema = checkSchema({
  username: {
    errorMessage: "username is required",
    isString: true,
    isLength: {
      errorMessage: "Name should be at least 4 characters long",
      options: { min: 4 },
    },
  },
  name: {
    errorMessage: "Name is required",
    isString: true,
    isLength: {
      errorMessage: "Name should be at least 5 characters long",
      options: { min: 5 },
    },
  },
  password: {
    errorMessage: "Password is required",
    isString: true,
    isLength: {
      errorMessage: "Password should be at least 8 chars long",
      options: { min: 8 },
    },
  },
  age: {
    isInt: true,
    errorMessage: "Age should be integer",
  },
});
