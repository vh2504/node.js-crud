const helper = require("../../../helpers/helpers");
const userModel = require("../../models/user.model");
const { validationResult } = require("express-validator");
const { generateJWTToken } = require("../../services/user.service");

class UserController {

  async getListUser(req, res, next) {
    const users = await userModel.find();

    return helper.sendResponse(res, users, 200, "successfull");
 
  }

  async createUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return helper.sendResponse(res, "error", 400, errors.errors[0].msg);
    }

    const userName = req.body.username?.trim();
    const password = req.body.password?.trim();
    const name = req.body.name?.trim();
    const age = req.body.age;

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

    } catch (error) {
      return helper.sendResponse(res, error.message, 400, "error");
    }

    return helper.sendResponse(res, "success", 200, "Create user success.");
  }

  async updateUser(req, res) {
    const userId = req.params.userId;
    const userName = req.body.username.trim();
    const password = req.body.password.trim();
    const name = req.body.name.trim();
    const age = req.body.age;

    try {
      const user = await userModel.find({ _id: userId });

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
      return helper.sendResponse(res, "error", 400, "Update user error.");
    }
  }

  async deleteUser(req, res) {
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
