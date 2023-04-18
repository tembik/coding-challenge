const { User } = require("../models");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

// fungsi untuk menampilkan seluruh user 
const getAllUser = async (req, res) => {
  try {
    const hasil = await User.findAll({
      attributes: ["id", "name", "username"],
    });
    res.json(hasil);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// register user
const regUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const userCek = await User.findOne({ where: { username: username } });
    if (userCek) {
      res.json({ gagal: "username sudah dipakai" });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      await User.create({
        name: name,
        username: username,
        password: hashedPass,
      });
      res.json({ message: "berhasil melakukan pendaftaran" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCek = await User.findOne({ where: { username: username } });
    if (!userCek) {
      res.json({ message: "username belum terdaftar" });
    } else {
      const passCek = await bcrypt.compare(password, userCek.password);
      if (!passCek) {
        res.json({ message: "password salah" });
      } else {
        // res.json({ message: "log in berhasil" });
        const accessToken = sign(
          { username: userCek.username, id: userCek.id },
          "rahasiaAccessToken",
          { expiresIn: "30s" } // expired dalam 30 detik
        );
        const refreshToken = sign(
          { username: userCek.username, id: userCek.id },
          "rahasiaRefreshToken",
          { expiresIn: "1d" } // expired dalam 1 hari
        );
        await User.update(
          { refresh_token: refreshToken },
          { where: { id: userCek.id } }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.json({ accessToken });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// logout user
const logOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.json({ error: "user not login" });
    const currentUser = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!currentUser) {
      res.json({ message: "user tidak ditemukan" });
    } else {
      await User.update(
        {
          refresh_token: null,
        },
        { where: { id: currentUser.id } }
      );
      res.clearCookie("refreshToken");
      res.json({ message: "berhasil logout" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// fungsi digunakan hanya untuk mengggenerete acces token baru tanpa harus login krn masa expired acces token sangat pendek
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.json({ error: "user not login" });
    const currentUser = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!currentUser) return res.json({ error: "forbidden" });
    verify(refreshToken, "rahasiaRefreshToken", (err, decoded) => {
      if (err) return res.json({ error: "forbidden" });
      const accessToken = sign(
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

module.exports = { getAllUser, regUser, loginUser, logOut, refreshToken };
