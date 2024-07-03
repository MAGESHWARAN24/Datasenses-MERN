const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        // console.log(decodedTo  ken)
        if (err) {
          res.status(403).redirect("/");
        }
        next();
      });
    } else {
      res.status(403).redirect("/");
    }
  } catch (error) {
    res.status(403).redirect("/");
  }
};
