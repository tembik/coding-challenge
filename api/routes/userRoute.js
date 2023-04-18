const express = require("express");
const router = express.Router();
const { validateToken } = require("../auth/loginAuth");
const {
  getAllUser,
  regUser,
  loginUser,
  logOut,
  refreshToken
} = require("../controllers/userController");

router.get("/", validateToken, getAllUser);

router.post("/register", regUser);

router.post("/login", loginUser);

router.delete("/logout", logOut)

router.get("/token", refreshToken)

module.exports = router;
