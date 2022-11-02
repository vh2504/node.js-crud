var express = require("express");
var router = express.Router();

const userController = require("../../app/controllers/api/UserController");
const authMiddleware = require("../../middlewares/AuthMiddleware");
const { body, validationResult } = require("express-validator");
const userValidator = require("../../validators/user.validate");
const userLoginValidator = require("../../validators/user-login.validate");

router.post("/login", userLoginValidator.loginSchema, userController.login);

router.use(authMiddleware.authenticateToken);
/* GET home page. */
router.get("/", userController.index);
router.post("/", userValidator.addUserSchema, userController.create);
router.put("/:userId", userController.update);
router.delete("/:userId", userController.delete);

module.exports = router;
