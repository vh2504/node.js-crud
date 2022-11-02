const helper = require("../../../Helpers/helpers");

class StudentController {
  index(req, res, next) {
    let user = { name: "John", email: "abc@gmail.com" };
    console.log(typeof user);

    const jsonContent = JSON.stringify(user);
    console.log(typeof jsonContent);
    res.send(jsonContent);
    // res.json({ foo: "bar" });
  }

  login(req, res, next) {
    const userName = "vh";
    const password = "1234";

    let body = {
      userName: req.body.username.trim(),
      password: req.body.password.trim(),
    };

    console.log(body);
    if (userName == body.userName && password == body.password) {
      return helper.sendResponse(res, "success", 200, "Login success.");
    }
    return helper.sendResponse(res, "Error", 400, "Login failed.");
  }
}

module.exports = new StudentController();
