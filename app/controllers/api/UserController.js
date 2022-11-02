const helper = require("../../../Helpers/helpers");
const userModel = require("../../models/UserModel");
const { body, validationResult } = require("express-validator");
const { generateJWTToken } = require("../../../services/UserService");

class UserController {
  async index(req, res, next) {
    // find each person with a last name matching 'Ghost'
    // const query = userModel.findOne({ username: "vh254" });
    // // selecting the `username` and `password` fields
    // query.select("username password");
    // // execute the query at a later time
    // query.exec(function (err, user) {
    //   if (err) return handleError(err);
    //   // Prints
    //   console.log("%s %s.", user.username, user.password);
    //   console.log(user);
    //   res.json(user);
    // });
    let users = await userModel.find();

    return helper.sendResponse(res, users, 200, "successfull");
    // userModel.find().then((users) => {
    //   users.forEach((user) => {
    //     console.log(user.id, user.username);
    //   });
    // });
    // return helper.sendResponse(res, "ok", 200, "successfull");
  }

  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return helper.sendResponse(res, "error", 400, errors.errors[0].msg);
    }

    const userName = req.body.username?.trim();
    const password = req.body.password?.trim();
    const name = req.body.name?.trim();
    const age = req.body.age;

    if (!userName || !password || !name || !age) {
      return helper.sendResponse(
        res,
        "error",
        400,
        "Validate create user failed."
      );
    }

    const user = await userModel.find({username: userName});
    if (user.length > 0) {
      return helper.sendResponse(res, null, 400, "user exists");
    }

    const u = new userModel({
      username: userName,
      password: password,
      name: name,
      age: age,
    });

    try {
      await u.validate();
      await userModel.create(u);

      //   await userModel.create(u, function (err, user) {
      //     console.log(err);
      //   });
    } catch (error) {
      return helper.sendResponse(res, error.message, 400, "error");
    }

    return helper.sendResponse(res, "success", 200, "Create user success.");
  }

  async update(req, res) {
    const userId = req.params.userId;
    const userName = req.body.username.trim();
    const password = req.body.password.trim();
    const name = req.body.name.trim();
    const age = req.body.age;

    try {
      let user = await userModel.find({ _id: userId });

      if (Object.keys(user).length === 0) {
        return helper.sendResponse(res, "error", 400, "Cannot find user.");
      }

      user.username = userName || user.username;
      user.password = password || user.password;
      user.name = name || user.name;
      user.age = age || user.age;

      user.save();

      return helper.sendResponse(res, user, 200, "Update user success.");
    } catch (error) {
      console.log(error);
      return helper.sendResponse(res, "error", 400, "Update user error.");
    }
  }

  async delete(req, res) {
    const userId = req.params.userId;

    try {
      const user = await userModel.find({ _id: userId });

      if (Object.keys(user).length === 0) {
        return helper.sendResponse(res, "error", 400, "User not found.");
      }

      await userModel.deleteOne({ _id: userId });

      return helper.sendResponse(res, "success", 200, "Delete user success.");
    } catch (error) {
      return helper.sendResponse(res, error.message, 400, "Delete user error.");
    }
  }

  async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return helper.sendResponse(res, "error", 400, errors.errors[0].msg);
    }

    try {
      const username = req.body.username

      const user = await userModel.find({
        username: username, 
        password: req.body.password
      })

      if (user.length === 0) {
        return helper.sendResponse(res, false, 400, "Login failed");
      }

      const token = generateJWTToken({ username: username })
      return helper.sendResponse(res, {access_token: token}, 200, "login success");
    } catch (error) {
      return helper.sendResponse(res, error.message, 400, "Error when login");
    }
  }
}

module.exports = new UserController();
