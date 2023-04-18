const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    res.json({ error: "user not login" });
  } else {
    verify(accessToken, "rahasiaAccessToken", (err, decoded) => {
      if (err) return res.json({ error: "forbidden" });
      req.username = decoded.username;
      next();
    });
  }
};

module.exports = { validateToken };
