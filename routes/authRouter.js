const express = require("express");
const { Router } = express;
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

var authRouter = Router();

authRouter.use(express.json());

// Strategy 설정부
passport.use(
  new LocalStrategy((id, password, done) => {
    User.findOne({ id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      !user.validPassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    });
  })
);

authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ result: "FAIL" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

authRouter.post("/logout", (req, res) => {
  res.json({
    result: "SUCCESS",
    api: "logout",
  });
});

module.exports = authRouter;
