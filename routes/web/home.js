var express = require("express");
var router = express.Router();
const homeController = require("../../app/controllers/home.controller");
/* GET home page. */

router.get("/", homeController.index);
router.get("/news/:id", homeController.news);

module.exports = router;
