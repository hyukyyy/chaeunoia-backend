const express = require("express");
const { Router } = express;
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = Router();

authRouter.use(express.json());

authRouter.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { id, password, username, email, phone } = req.body;
  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      id,
      password: hash,
      username,
      email,
      phone: phone.split("-").join(""),
    });
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

authRouter.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.log(user, info);
      return res.json({ result: "FAIL", user });
    }
    return res
      .login(user, (loginErr) => {
        console.error(loginErr);
        return next(loginErr);
      })
      .json({ result: "SUCCESS", user });
  })(req, res, next);
});

authRouter.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({
    result: "SUCCESS",
    api: "logout",
  });
});

module.exports = authRouter;
