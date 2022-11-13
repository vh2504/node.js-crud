const express = require("express");
const router = express.Router();
const userController = require("../../app/controllers/api/user.controller");
const authMiddleware = require("../../app/middlewares/auth.middleware");
const userValidator = require("../../app/validators/user.validate");
const userLoginValidator = require("../../app/validators/user-login.validate");

router.post("/login", userLoginValidator.loginSchema, userController.login);

router.use(authMiddleware.authenticateToken);

router.get("/", userController.getListUser);
router.post("/", userValidator.addUserSchema, userController.createUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
