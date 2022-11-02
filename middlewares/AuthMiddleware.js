const jwt = require("jsonwebtoken");

const checkUserId = (req, res, next) => {
  console.log(req.params.userId);
  if (req.params.userId != 7) {
    next("route");
    return;
  }
  console.log("user error");

  //   next();
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader.split(" "));
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ error: "access token is required" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    // console.log(err);

    if (err) return res.status(403).json({ error: "token failed" });

    req.user = user;
    // console.log(user);

    next();
  });
}

module.exports = { checkUserId, authenticateToken };
