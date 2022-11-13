const express = require("express");
const router = express.Router();

const studentController = require("../../app/controllers/api/student.controller");
/* GET home page. */
router.get("/", studentController.index);

module.exports = router;
