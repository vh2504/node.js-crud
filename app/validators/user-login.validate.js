const { checkSchema } = require("express-validator");

exports.loginSchema = checkSchema({
  username: {
    errorMessage: "username is required",
    isString: true
  },
  password: {
    errorMessage: "Password is required",
    isString: true,
    isLength: {
      errorMessage: "Password should be at least 8 chars long",
      options: { min: 8 },
    },
  },
});
