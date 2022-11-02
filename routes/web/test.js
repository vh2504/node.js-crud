var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("test router 2");
});

router.get("/:userId", function (req, res, next) {
  res.send("test router 3");
});

module.exports = router;
