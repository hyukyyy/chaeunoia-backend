const express = require("express");
const { Router } = express;
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

var authRouter = Router();

authRouter.use(express.json());

authRouter.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    {
      passReqToCallback: true,
    },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log(user, info);
        return res.json({ result: "FAIL", user });
      }
      return res.json({ result: "SUCCESS", user });
      // req.logIn(user, (err) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   return res.redirect("/");
      // });
    }
  )(req, res, next);
});

authRouter.post("/logout", (req, res) => {
  res.json({
    result: "SUCCESS",
    api: "logout",
  });
});

// Strategy 설정부
passport.use(
  new LocalStrategy(
    { usernameField: "id", passwordField: "password" },
    (req, id, password, done) => {
      console.log("req.body");
      console.log(req.body);
      console.log(req, id, password, done);
      User.findOne({ id: req.body.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("1");
          return done(null, null, { message: "Incorrect username." });
        }
        !user.validPassword(req.body.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (!isMatch) {
            console.log("2");
            return done(null, null, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      });
    }
  )
);

module.exports = authRouter;
