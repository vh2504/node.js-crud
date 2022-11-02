var express = require("express");
var router = express.Router();

const studentController = require("../../app/controllers/api/StudentController");
/* GET home page. */
router.get("/", studentController.index);
router.post("/login", studentController.login);

module.exports = router;
