var express = require("express");
var router = express.Router();
const homeController = require("../../app/controllers/HomeController");
/* GET home page. */

router.get("/", homeController.index);
router.get("/news/:id", homeController.news);
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

module.exports = router;
