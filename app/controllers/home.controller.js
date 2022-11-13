class HomeController {
  index(req, res, next) {
    res.render("index", { title: "Express" });
  }

  news(req, res, next) {
    const id = req.params.id;

    console.log("news id: ", id);
    res.send("News page");
  }
}

module.exports = new HomeController();
