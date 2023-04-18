const { User } = require("../models");
const jwt = require("jsonwebtoken");

// fungsi digunakan hanya untuk mengggenerete acces token baru tanpa harus login krn masa expired acces token sangat pendek
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.json({ error: "user not login" });
    const currentUser = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!currentUser) return res.json({ error: "forbidden" });
    jwt.verify(refreshToken, "rahasiaRefreshToken", (err, decoded) => {
      if (err) return res.json({ error: "forbidden" });
      const accessToken = jwt.sign(
        { username: currentUser.username, id: currentUser.id },
        "rahasiaAccessToken",
        { expiresIn: "30s" } // expired dalam 30 detik
      );
      res.json({ accessToken });
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { refreshToken }