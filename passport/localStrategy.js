const passport = require("passport");
const LocalStarategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  console.log("Setting Local Strategy");
  // passport.use(
  //   new LocalStarategy(
  //     {
  //       usernameField: "id",
  //       passwordField: "password",
  //     },
  //     async (id, password, done) => {
  //       try {
  //         const exUser = await User.findOne({ id });
  //         if (exUser) {
  //           const result = await bcrypt.compare(password, exUser.password);
  //           if (result) {
  //             done(null, exUser);
  //           } else {
  //             done(null, false, { message: "INCORRECT_PASSWORD" });
  //           }
  //         } else {
  //           done(null, false, { message: "INCORRECT_ID" });
  //         }
  //       } catch (err) {
  //         console.error(err);
  //         done(err);
  //       }
  //     }
  //   )
  // );
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
