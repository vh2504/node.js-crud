const { checkSchema } = require("express-validator");

exports.loginSchema = checkSchema({
  username: {
    errorMessage: "username is required",
    isString: true
  },
  password: {
    errorMessage: "Password is required",
    isString: true
  },
});
